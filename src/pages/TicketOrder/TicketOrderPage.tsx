import React, { useEffect, useState } from 'react';
import type { TicketOrder } from '../../api/ticket-order/types';
import { getTicketOrderList, addTicketOrder, updateTicketOrder, getTicketOrderDetail, cancelTicketOrder, payedTicketOrder, issuedTicketOrder } from '../../api/ticket-order';
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
  IconButton,
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TicketOrderFormDialog from './components/TicketOrderFormDialog';
import PayDialog from './components/PayDialog';
import IssuedDialog from './components/IssuedDialog';
import TicketOrderDetailDialog from './components/TicketOrderDetailDialog';
import { useTranslation } from 'react-i18next';

const TicketOrderPage: React.FC = () => {
  const { t } = useTranslation();
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getTicketOrderList({ PageIndex: pageIndex + 1, PageSize: pageSize });
      setData(res.data || []);
      setTotal(res.total || 0);
    } finally {
      setLoading(false);
    }
  };

  // 获取供应商列表
  const fetchSuppliers = async () => {
    const res = await getSupplierList({ PageIndex: 1, PageSize: 100 });
    setSuppliers(res.data || []);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

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
        rateBooking: values.rateBooking ?? undefined,
        changeRule: values.changeRule ?? undefined,
        refundRule: values.refundRule ?? undefined,
        originalTicketFee: values.originalTicketFee ?? undefined,
        ticketFee: values.ticketFee ?? undefined,
        taxFee: values.taxFee ?? undefined,
        insuranceFee: values.insuranceFee ?? undefined,
        serviceFee: values.serviceFee ?? undefined,
        status: values.status ?? undefined,
      });
    } else {
      await addTicketOrder({
        pnr: values.pnr ?? undefined,
        bookerName: values.bookerName ?? undefined,
        bookerContact: values.bookerContact ?? undefined,
        rateBooking: values.rateBooking ?? undefined,
        changeRule: values.changeRule ?? undefined,
        refundRule: values.refundRule ?? undefined,
        originalTicketFee: values.originalTicketFee ?? undefined,
        ticketFee: values.ticketFee ?? undefined,
        taxFee: values.taxFee ?? undefined,
        insuranceFee: values.insuranceFee ?? undefined,
        serviceFee: values.serviceFee ?? undefined,
        flightList: values.flightList,
        passengerList: values.passengerList,
        supplierId: values.supplierId ?? undefined,
      });
    }
    setDialogOpen(false);
    setEditingOrder(null);
    fetchData();
  };

  return (
    <Box p={2}>
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
                    <Button size="small" onClick={() => handleShowDetail(item)} style={{ marginRight: 8 }}>{t('common.detail') || t('detail')}</Button>
                    {item.status===0&&<IconButton size="small" onClick={() => handleEdit(item)} disabled={loading}><EditIcon /></IconButton>}
                    {item.status===0&&<Button size="small" color="primary" onClick={() => handlePay(item)} disabled={loading} style={{ marginLeft: 8 }}>{t('ticketOrder.pay')}</Button>}
                    {item.status===2&&<Button size="small" color="success" onClick={() => handleIssued(item)} disabled={loading} style={{ marginLeft: 8 }}>{t('ticketOrder.issued')}</Button>}
                    {item.status!==1&&<Button size="small" color="error" onClick={() => handleCancel(item)} disabled={loading} style={{ marginLeft: 8 }}>{t('ticketOrder.cancel')}</Button>}
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
