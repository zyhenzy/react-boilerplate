import React, { useEffect, useState } from 'react';
import type { TicketOrder } from '../../api/ticket-order/types';
import { getTicketOrderList, addTicketOrder, updateTicketOrder } from '../../api/ticket-order';
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
    fetchData();
    fetchSuppliers();
  }, [pageIndex, pageSize]);

  const handleAdd = () => {
    setEditingOrder(null);
    setDialogOpen(true);
  };

  const handleEdit = (order: TicketOrder) => {
    setEditingOrder(order);
    setDialogOpen(true);
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
      <TicketOrderFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        form={editingOrder || {}}
        setForm={setEditingOrder as any}
        editingId={editingOrder?.id || null}
        suppliers={suppliers}
      />
    </Box>
  );
};

export default TicketOrderPage;
