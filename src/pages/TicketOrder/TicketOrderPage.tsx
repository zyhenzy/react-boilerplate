import React, { useEffect, useState } from 'react';
import type { TicketOrder } from '../../api/ticket-order/types';
import { getTicketOrderList, addTicketOrder, updateTicketOrder, getTicketOrderDetail, cancelTicketOrder, payedTicketOrder, issuedTicketOrder, downloadTicketOrderWord } from '../../api/ticket-order';
import { getSupplierList } from '../../api/supplier';
import type { Supplier } from '../../api/supplier/types';
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
  TextField
} from '@mui/material';
import TicketOrderFormDialog from './components/TicketOrderFormDialog';
import PayDialog from './components/PayDialog';
import IssuedDialog from './components/IssuedDialog';
import TicketOrderDetailDialog from './components/TicketOrderDetailDialog';
import { useTranslation } from 'react-i18next';

const TicketOrderPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<TicketOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<TicketOrder | null>(null);
  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [payingOrder, setPayingOrder] = useState<TicketOrder | null>(null);
  const [payLoading, setPayLoading] = useState(false);
  const [issuedDialogOpen, setIssuedDialogOpen] = useState(false);
  const [issuingOrder, setIssuingOrder] = useState<TicketOrder | null>(null);
  const [issuedLoading, setIssuedLoading] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState<TicketOrder | null>(null);
  const [query, setQuery] = useState({
    BillNo: '',
    PassengerName: '',
    TicketNo: '',
    StartDate: '',
    EndDate: '',
    SortField: '',
    IsDesc: false,
    Ordering: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getTicketOrderList({
        PageIndex: pageIndex + 1,
        PageSize: pageSize,
        ...query,
      });
      setData(res.data || []);
      setTotal(res.total || 0);
    } finally {
      setLoading(false);
    }
  };

  // 获取供应商列表
  const fetchSuppliers = async () => {
    const res = await getSupplierList({ PageIndex: 1, PageSize: 1000 });
    setSuppliers(res.data || []);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, query]);

  const handleAdd = () => {
    setEditingOrder({passengerList:[], flightList:[]});
    setDialogOpen(true);
  };

  const handleEdit = async (order: TicketOrder) => {
    const res = await getTicketOrderDetail(order.id!);
    setEditingOrder(res || order);
    setDialogOpen(true);
  };

  const handleCancel = async (order: TicketOrder) => {
    setLoading(true);
    try {
      await cancelTicketOrder({ id: order.id! });
      fetchData();
    } finally {
      setLoading(false);
    }
  };

  const handlePay = (order: TicketOrder) => {
    setPayingOrder(order);
    setPayDialogOpen(true);
  };

  const handlePaySubmit = async (values: any) => {
    setPayLoading(true);
    try {
      await payedTicketOrder(values);
      setPayDialogOpen(false);
      setPayingOrder(null);
      fetchData();
    } finally {
      setPayLoading(false);
    }
  };

  const handleIssued = (order: TicketOrder) => {
    setIssuingOrder(order);
    setIssuedDialogOpen(true);
  };

  const handleIssuedSubmit = async (values: any) => {
    setIssuedLoading(true);
    try {
      await issuedTicketOrder(values);
      setIssuedDialogOpen(false);
      setIssuingOrder(null);
      fetchData();
    } finally {
      setIssuedLoading(false);
    }
  };

  const handleShowDetail = async (order: TicketOrder) => {
    const res = await getTicketOrderDetail(order.id!);
    setDetailOrder(res || order);
    setDetailDialogOpen(true);
  };

  const handleSubmit = async (values: Partial<TicketOrder>) => {
    if (values.id) {
      await updateTicketOrder({
        id: values.id,
        pnr: values.pnr ?? undefined,
        bookerName: values.bookerName ?? undefined,
        bookerContact: values.bookerContact ?? undefined,
        rateBooking: Number(values.rateBooking) ?? undefined,
        currencyBooking: values.currencyBooking ?? undefined,
        changeRule: values.changeRule ?? undefined,
        refundRule: values.refundRule ?? undefined,
        originalTicketFee: Number(values.originalTicketFee) ?? undefined,
        ticketFee: Number(values.ticketFee) ?? undefined,
        taxFee: Number(values.taxFee) ?? undefined,
        insuranceFee: Number(values.insuranceFee) ?? undefined,
        serviceFee: Number(values.serviceFee) ?? undefined,
        status: values.status ?? undefined,
      });
    } else {
      await addTicketOrder({
        pnr: values.pnr ?? undefined,
        bookerName: values.bookerName ?? undefined,
        bookerContact: values.bookerContact ?? undefined,
        rateBooking: Number(values.rateBooking) ?? undefined,
        changeRule: values.changeRule ?? undefined,
        refundRule: values.refundRule ?? undefined,
        originalTicketFee: Number(values.originalTicketFee) ?? undefined,
        ticketFee: Number(values.ticketFee) ?? undefined,
        taxFee: Number(values.taxFee) ?? undefined,
        insuranceFee: Number(values.insuranceFee) ?? undefined,
        serviceFee: Number(values.serviceFee) ?? undefined,
        flightList: values.flightList,
        passengerList: values.passengerList,
        supplierId: values.supplierId ?? undefined,
        customerId: values.customerId ?? undefined,
      });
    }
    setDialogOpen(false);
    setEditingOrder(null);
    fetchData();
  };

  const handleDownloadWord = (order: TicketOrder) => {
    downloadTicketOrderWord(i18n.language, order.id!);
  };

  return (
    <Box p={2}>
      <Box mb={2}>
        <form style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}
              onSubmit={e => { e.preventDefault(); setPageIndex(0); }}>
          <TextField
            label={t('ticketOrder.billNo')}
            size="small"
            value={query.BillNo}
            onChange={e => setQuery(q => ({ ...q, BillNo: e.target.value }))}
            style={{ width: 160 }}
          />
          <TextField
            label={t('ticketOrder.passengerName')}
            size="small"
            value={query.PassengerName}
            onChange={e => setQuery(q => ({ ...q, PassengerName: e.target.value }))}
            style={{ width: 160 }}
          />
          <TextField
            label={t('ticketOrder.ticketNo')}
            size="small"
            value={query.TicketNo}
            onChange={e => setQuery(q => ({ ...q, TicketNo: e.target.value }))}
            style={{ width: 160 }}
          />
          <TextField
            label={t('common.startDate')}
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={query.StartDate}
            onChange={e => setQuery(q => ({ ...q, StartDate: e.target.value }))}
            style={{ width: 160 }}
          />
          <TextField
            label={t('common.endDate')}
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={query.EndDate}
            onChange={e => setQuery(q => ({ ...q, EndDate: e.target.value }))}
            style={{ width: 160 }}
          />
          <Button type="submit" variant="contained" color="primary">{t('common.search')}</Button>
          <Button onClick={() => {
            setQuery({ BillNo: '', PassengerName: '', TicketNo: '', StartDate: '', EndDate: '', SortField: '', IsDesc: false, Ordering: '' });
            setPageIndex(0);
          }} style={{ marginLeft: 8 }}>{t('common.reset')}</Button>
        </form>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>{t('ticketOrder.title')}</h2>
        <Button variant="contained" onClick={handleAdd}>{t('ticketOrder.add')}</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('ticketOrder.billNo')}</TableCell>
              <TableCell>{t('ticketOrder.bookerName')}</TableCell>
              <TableCell>{t('ticketOrder.bookerContact')}</TableCell>
              <TableCell>{t('ticketOrder.pnr')}</TableCell>
              <TableCell>{t('ticketOrder.status')}</TableCell>
              <TableCell>{t('ticketOrder.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} align="center">{t('ticketOrder.loading')}</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={6}>{t('ticketOrder.noData')}</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.billNo}</TableCell>
                  <TableCell>{item.bookerName}</TableCell>
                  <TableCell>{item.bookerContact}</TableCell>
                  <TableCell>{item.pnr}</TableCell>
                  <TableCell>{t(`ticketOrder.status_${item.status}`)}</TableCell>
                  <TableCell>
                    {item.status!==0&&<Button size="small" onClick={() => handleShowDetail(item)}>{t('common.detail')}</Button>}
                    {item.status===0&&<Button size="small" onClick={() => handleEdit(item)} disabled={loading}>{t('common.edit')}</Button>}
                    {item.status===0&&<Button size="small" color="primary" onClick={() => handlePay(item)} disabled={loading}>{t('ticketOrder.pay')}</Button>}
                    {item.status===2&&<Button size="small" color="success" onClick={() => handleIssued(item)} disabled={loading}>{t('ticketOrder.issued')}</Button>}
                    {item.status===0&&<Button size="small" color="error" onClick={() => handleCancel(item)} disabled={loading}>{t('ticketOrder.cancel')}</Button>}
                    <Button size="small" color="secondary" onClick={() => handleDownloadWord(item)} style={{ marginLeft: 8 }}>{t('ticketOrder.downloadWord')}</Button>
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
      <TicketOrderFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        form={editingOrder || {}}
        setForm={setEditingOrder as any}
        editingId={editingOrder?.id || null}
        suppliers={suppliers}
      />
      <PayDialog
        open={payDialogOpen}
        onClose={() => setPayDialogOpen(false)}
        onSubmit={handlePaySubmit}
        loading={payLoading}
        orderId={payingOrder?.id}
      />
      <IssuedDialog
        open={issuedDialogOpen}
        onClose={() => setIssuedDialogOpen(false)}
        onSubmit={handleIssuedSubmit}
        loading={issuedLoading}
        orderId={issuingOrder?.id}
      />
      <TicketOrderDetailDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        order={detailOrder}
      />
    </Box>
  );
};

export default TicketOrderPage;
