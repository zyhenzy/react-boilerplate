import React, { useEffect, useState } from 'react';
import type { Customer } from "../../api/customer/types";
import { createCustomer, enableCustomer, getCustomerList, updateCustomer } from "../../api/customer";
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
  Switch,
  IconButton,
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomerFormDialog from './components/CustomerFormDialog';
import { useTranslation } from 'react-i18next';

const CustomerPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // 统一分页从0开始
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Partial<Customer> | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getCustomerList({ PageIndex: pageIndex + 1, PageSize: pageSize });
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
    setEditingCustomer({ name: '', contact: '', enable: true });
    setDialogOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setDialogOpen(true);
  };

  const handleSubmit = async (values: Partial<Customer>) => {
    const submitValues = { ...values, enable: values.enable === undefined ? true : values.enable };
    if (submitValues.id) {
      await updateCustomer(submitValues as Customer);
    } else {
      await createCustomer(submitValues as Omit<Customer, 'id'>);
    }
    setDialogOpen(false);
    setEditingCustomer(null);
    fetchData();
  };

  const handleEnable = async (customer: Customer) => {
    await enableCustomer(customer.id!, !customer.enable);
    setData(prevData => prevData.map(item => item.id === customer.id ? { ...item, enable: !item.enable } : item));
  };

  return (
    <Box p={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <h2>{t('customer.title')}</h2>
        <Button variant="contained" onClick={handleAdd}>{t('customer.add')}</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('customer.name')}</TableCell>
              <TableCell>{t('customer.contact')}</TableCell>
              <TableCell>{t('customer.countryCode')}</TableCell>
              <TableCell>{t('customer.currency')}</TableCell>
              <TableCell>{t('customer.invoiceHeader')}</TableCell>
              <TableCell>{t('customer.invoiceTaxNumber')}</TableCell>
              <TableCell>{t('customer.enable')}</TableCell>
              <TableCell>{t('customer.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} align="center">{t('customer.loading')}</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={7}>{t('customer.noData')}</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.countryCode}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.invoiceHeader}</TableCell>
                  <TableCell>{item.invoiceTaxNumber}</TableCell>
                  <TableCell>
                    <Switch checked={item.enable} onChange={() => handleEnable(item)} disabled={loading} />
                  </TableCell>
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
        labelRowsPerPage={t('common.rowsPerPage')}
      />
      <CustomerFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingCustomer(null); }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!editingCustomer?.name || !editingCustomer?.contact) return;
          handleSubmit(editingCustomer as Partial<Customer>);
        }}
        form={editingCustomer || { name: '', contact: '', enable: true }}
        setForm={f => setEditingCustomer(f as Partial<Customer> | null)}
        editingId={editingCustomer?.id || null}
      />
    </Box>
  );
};

export default CustomerPage;
