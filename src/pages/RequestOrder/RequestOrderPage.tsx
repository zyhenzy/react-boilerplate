import React, { useEffect, useState } from 'react';
import type { RequestOrder} from "../../api/request-order/types";
import { getRequestOrderList, addRequestOrder, updateRequestOrder } from "../../api/request-order";
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
import RequestOrderFormDialog from './components/RequestOrderFormDialog';
import { useTranslation } from 'react-i18next';

const RequestOrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<RequestOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<RequestOrder | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getRequestOrderList({ PageIndex: pageIndex + 1, PageSize: pageSize });
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

  const handleEdit = (order: RequestOrder) => {
    setEditingOrder(order);
    setDialogOpen(true);
  };

  const handleSubmit = async (values: Partial<RequestOrder>) => {
    if (values.id) {
      await updateRequestOrder({
        id: values.id,
        status: values.status ?? 0,
        remark: values.remark ?? undefined,
      });
    } else {
      await addRequestOrder({
        dep: values.dep ?? undefined,
        arr: values.arr ?? undefined,
        countryNumber: values.countryNumber ?? undefined,
        phoneNumber: values.phoneNumber ?? undefined,
        remark: values.remark ?? undefined,
        passengerList: values.passengerList,
        imageList: values.imageList,
      });
    }
    setDialogOpen(false);
    setEditingOrder(null);
    fetchData();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>{t('requestOrder.title')}</h2>
        <Button variant="contained" onClick={handleAdd}>{t('requestOrder.add')}</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('requestOrder.dep')}</TableCell>
              <TableCell>{t('requestOrder.arr')}</TableCell>
              <TableCell>{t('requestOrder.phoneNumber')}</TableCell>
              <TableCell>{t('requestOrder.status')}</TableCell>
              <TableCell>{t('requestOrder.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} align="center">{t('requestOrder.loading')}</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={5}>{t('requestOrder.noData')}</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.dep}</TableCell>
                  <TableCell>{item.arr}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{t(`requestOrder.status_${item.status}`)}</TableCell>
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
      <RequestOrderFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingOrder(null); }}
        onSubmit={handleSubmit}
        form={editingOrder || { dep: '', arr: '', phoneNumber: '', status: 0 }}
        setForm={f => setEditingOrder(f as RequestOrder | null)}
        editingId={editingOrder?.id || null}
      />
    </Box>
  );
};

export default RequestOrderPage;
