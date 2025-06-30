import React, { useEffect, useState } from 'react';
import type { AgentOrder } from '../../api/agent-order/types';
import {
  getAgentOrderList,
  reviewFailedAgentOrder,
  convertedAgentOrder,
  getAgentOrderDetail,
  issuedAgentOrder,
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
  TablePagination,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
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
  const [query, setQuery] = useState<import('../../api/agent-order/types').AgentOrderQuery>({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAgentOrderList({
        PageIndex: pageIndex + 1,
        PageSize: pageSize,
        ...query
      });
      setData(res.data || []);
      setTotal(res.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, query]);

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
      <Box mb={2}>
        <form style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}
              onSubmit={e => { e.preventDefault(); setPageIndex(0); fetchData(); }}>
          <TextField
            label={t('agentOrder.orderNo')}
            size="small"
            value={query.OrderNo || ''}
            onChange={e => setQuery(q => ({ ...q, OrderNo: e.target.value }))}
            style={{ width: 160 }}
          />
          <TextField
            label={t('common.startDate')}
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={query.StartDate || ''}
            onChange={e => setQuery(q => ({ ...q, StartDate: e.target.value }))}
            style={{ width: 160 }}
          />
          <TextField
            label={t('common.endDate')}
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={query.EndDate || ''}
            onChange={e => setQuery(q => ({ ...q, EndDate: e.target.value }))}
            style={{ width: 160 }}
          />
          <FormControl size="small" style={{ width: 140 }}>
            <InputLabel>{t('agentOrder.type')}</InputLabel>
            <Select
              label={t('agentOrder.type')}
              value={query.Type ?? ''}
              onChange={e => setQuery(q => ({ ...q, Type: e.target.value }))}
            >
              <MenuItem value="">{t('common.all')}</MenuItem>
              <MenuItem value={0}>{t('agentOrder.type0')}</MenuItem>
              <MenuItem value={1}>{t('agentOrder.type1')}</MenuItem>
              <MenuItem value={2}>{t('agentOrder.type2')}</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ width: 140 }}>
            <InputLabel>{t('agentOrder.status')}</InputLabel>
            <Select
              label={t('agentOrder.status')}
              value={query.Status ?? ''}
              onChange={e => setQuery(q => ({ ...q, Status: e.target.value }))}
            >
              <MenuItem value="">{t('common.all')}</MenuItem>
              <MenuItem value={0}>{t('agentOrder.status0')}</MenuItem>
              <MenuItem value={1}>{t('agentOrder.status1')}</MenuItem>
              <MenuItem value={2}>{t('agentOrder.status2')}</MenuItem>
              <MenuItem value={3}>{t('agentOrder.status3')}</MenuItem>
              <MenuItem value={4}>{t('agentOrder.status4')}</MenuItem>
              <MenuItem value={5}>{t('agentOrder.status5')}</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">{t('common.search')}</Button>
          <Button onClick={() => { setQuery({}); setPageIndex(0); fetchData(); }} style={{ marginLeft: 8 }}>{t('common.reset')}</Button>
        </form>
      </Box>
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
        labelRowsPerPage={t('common.rowsPerPage')}
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
