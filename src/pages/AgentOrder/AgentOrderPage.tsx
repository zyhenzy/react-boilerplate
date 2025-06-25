import React, { useEffect, useState } from 'react';
import type { AgentOrder } from '../../api/agent-order/types';
import {
  getAgentOrderList,
  reviewFailedAgentOrder,
  convertedAgentOrder,
  getAgentOrderDetail, issuedAgentOrder,
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
  TablePagination
} from '@mui/material';
import AgentOrderFormDialog from './AgentOrderFormDialog';
import ReviewFailedDialog from './ReviewFailedDialog';
import ConvertedDialog from './ConvertedDialog';
import IssuedDialog from './IssuedDialog';
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
  const [reviewFailedOpen, setReviewFailedOpen] = useState(false);
  const [reviewFailedId, setReviewFailedId] = useState<string | null>(null);
  const [convertedOpen, setConvertedOpen] = useState(false);
  const [convertedId, setConvertedId] = useState<string | null>(null);
  const [convertedOrder, setConvertedOrder] = useState<AgentOrder | null>(null);
  const [issuedOpen, setIssuedOpen] = useState(false);
  const [issuedOrder, setIssuedOrder] = useState<AgentOrder | null>(null);

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

  const handleReviewFailed = (id: string) => {
    setReviewFailedId(id);
    setReviewFailedOpen(true);
  };

  const handleReviewFailedSubmit = async (reason: string,tcRemark:string) => {
    if (!reviewFailedId) return;
    await reviewFailedAgentOrder({ id: reviewFailedId, reason, tcRemark });
    setReviewFailedOpen(false);
    setReviewFailedId(null);
    fetchData();
  };

  const handleConverted = async (item: AgentOrder) => {
    setConvertedId(item.id!);
    setConvertedOpen(true);
    // 获取最新详情
    const res = await getAgentOrderDetail(item.id!);
    setConvertedOrder(res || null);
  };

  const handleConvertedSubmit = async (form: import('../../api/agent-order/types').ConvertedAgentOrderCommand) => {
    if (!convertedId) return;
    await convertedAgentOrder(form);
    setConvertedOpen(false);
    setConvertedId(null);
    setConvertedOrder(null);
    fetchData();
  };

  const handleIssued = async (item: AgentOrder) => {
    // 获取最新详情
    const res = await getAgentOrderDetail(item.id!);
    setIssuedOrder(res);
    setIssuedOpen(true);
  };

  const handleIssuedSubmit = async (fields: { pnr: string; price: number; tax: number; serviceCharge: number; tcRemark: string }) => {
    // 这里需要调用 issuedAgentOrder，假设你已在 api/agent-order/index.ts 实现
    await issuedAgentOrder({ id: issuedOrder?.id!, ...fields });
    setIssuedOpen(false);
    setIssuedOrder(null);
    fetchData();
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
        <h2>{t('agentOrder.title')}</h2>
        {/*<Button variant="contained" onClick={handleAdd}>{t('agentOrder.add')}</Button>*/}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('agentOrder.orderNo')}</TableCell>
              <TableCell>{t('agentOrder.type')}</TableCell>
              <TableCell>{t('agentOrder.status')}</TableCell>
              <TableCell>{t('agentOrder.price')}</TableCell>
              <TableCell>{t('agentOrder.tax')}</TableCell>
              <TableCell>{t('agentOrder.serviceCharge')}</TableCell>
              <TableCell>{t('agentOrder.pnr')}</TableCell>
              <TableCell>{t('agentOrder.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8} align="center">{t('agentOrder.loading')}</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={8}>{t('agentOrder.noData')}</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.orderNo}</TableCell>
                  <TableCell>{t(`agentOrder.type${item.type}`)}</TableCell>
                  <TableCell>{t(`agentOrder.status${item.status}`)}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.tax}</TableCell>
                  <TableCell>{item.serviceCharge}</TableCell>
                  <TableCell>{item.pnr}</TableCell>
                  <TableCell>
                    {/*<IconButton size="small" onClick={() => handleEdit(item)} disabled={loading}><EditIcon /></IconButton>*/}
                    {item.status===0 && (
                        <>
                          <Button size="small" color="error" onClick={() => handleReviewFailed(item.id!)} disabled={loading} style={{marginLeft: 8}}>
                            {t('agentOrder.reviewFailed')}
                          </Button>
                          <Button size="small" color="primary" onClick={() => handleConverted(item)} disabled={loading} style={{marginLeft: 8}}>
                            {t('agentOrder.converted')}
                          </Button>
                        </>
                    )}
                    { item.status === 4 && <Button size="small" color="success" onClick={() => handleIssued(item)} disabled={loading} style={{marginLeft: 8}}>
                      {t('agentOrder.issued')}
                    </Button>}
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
      <ReviewFailedDialog
        open={reviewFailedOpen}
        onClose={() => setReviewFailedOpen(false)}
        onSubmit={handleReviewFailedSubmit}
      />
      <ConvertedDialog
        open={convertedOpen}
        onClose={() => { setConvertedOpen(false); setConvertedOrder(null); }}
        onSubmit={handleConvertedSubmit}
        order={convertedOrder}
      />
      <IssuedDialog
        open={issuedOpen}
        onClose={() => { setIssuedOpen(false); setIssuedOrder(null); }}
        onSubmit={handleIssuedSubmit}
        order={issuedOrder}
      />
    </Box>
  );
};

export default AgentOrderPage;
