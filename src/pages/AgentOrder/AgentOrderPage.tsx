import React, { useEffect, useState } from 'react';
import type { AgentOrder } from '../../api/agent-order/types';
import {
  getAgentOrderList,
  // 其它操作接口可后续补充
} from '../../api/agent-order';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AgentOrderFormDialog from './AgentOrderFormDialog';
import { useTranslation } from 'react-i18next';

const AgentOrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<AgentOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<AgentOrder | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAgentOrderList({ PageIndex: pageIndex + 1, PageSize: pageSize });
      setData(res.data || []);
      setTotal(res.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  const handleAdd = () => {
    setEditingOrder(null);
    setDialogOpen(true);
  };

  const handleEdit = (order: AgentOrder) => {
    setEditingOrder(order);
    setDialogOpen(true);
  };

  // 这里只做UI，实际新增/编辑需调用后端接口
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDialogOpen(false);
    setEditingOrder(null);
    fetchData();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>{t('agentOrder.title', '代理订单管理')}</h2>
        <Button variant="contained" onClick={handleAdd}>{t('agentOrder.add', '新增订单')}</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('agentOrder.orderNo', '订单号')}</TableCell>
              <TableCell>{t('agentOrder.type', '订单类型')}</TableCell>
              <TableCell>{t('agentOrder.status', '订单状态')}</TableCell>
              <TableCell>{t('agentOrder.price', '票面价')}</TableCell>
              <TableCell>{t('agentOrder.tax', '税费')}</TableCell>
              <TableCell>{t('agentOrder.serviceCharge', '服务费')}</TableCell>
              <TableCell>{t('agentOrder.pnr', 'PNR')}</TableCell>
              <TableCell>{t('agentOrder.actions', '操作')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8} align="center">{t('agentOrder.loading', '加载中...')}</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={8}>{t('agentOrder.noData', '暂无数据')}</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.orderNo}</TableCell>
                  <TableCell>{t(`agentOrder.type${item.type}`, String(item.type))}</TableCell>
                  <TableCell>{t(`agentOrder.status${item.status}`, String(item.status))}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.tax}</TableCell>
                  <TableCell>{item.serviceCharge}</TableCell>
                  <TableCell>{item.pnr}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(item)} disabled={loading}><EditIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={pageIndex}
        onPageChange={(_, newPage) => setPageIndex(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={e => { setPageSize(Number(e.target.value)); setPageIndex(0); }}
        rowsPerPageOptions={[10, 20, 50]}
      />
      <AgentOrderFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingOrder(null); }}
        onSubmit={handleSubmit}
        form={editingOrder || {}}
        setForm={f => setEditingOrder(f as AgentOrder | null)}
        editingId={editingOrder?.id || null}
      />
    </Box>
  );
};

export default AgentOrderPage;

