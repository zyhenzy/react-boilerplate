import React, { useEffect, useState } from 'react';
import { getSupplierList, createSupplier, updateSupplier, enableSupplier } from '../../api/supplier';
import type { Supplier } from '../../api/supplier/types';
import SupplierFormDialog from './components/SupplierFormDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';

const SupplierPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // 统一分页从0开始
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getSupplierList({ PageIndex: pageIndex + 1, PageSize: pageSize });
      setData(res.data || []);
      setTotal(res.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPageIndex(newPage);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0);
  };

  const handleAdd = async (values: Omit<Supplier, 'id'>) => {
    await createSupplier(values);
    setDialogOpen(false);
    fetchData();
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setDialogOpen(true);
  };

  const handleUpdate = async (values: Supplier) => {
    await updateSupplier(values);
    setDialogOpen(false);
    setEditingSupplier(null);
    fetchData();
  };

  const handleEnable = async (supplier: Supplier) => {
    await enableSupplier(supplier.id!, !supplier.enable);
    setData(prevData => prevData.map(item => item.id === supplier.id ? { ...item, enable: !item.enable } : item));
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>{t('supplier.title')}</h2>
        <Button variant="contained" onClick={() => { setEditingSupplier(null); setDialogOpen(true); }}>{t('supplier.add')}</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('supplier.name')}</TableCell>
              <TableCell>{t('supplier.contact')}</TableCell>
              <TableCell>{t('supplier.currency')}</TableCell>
              <TableCell>{t('supplier.enable')}</TableCell>
              <TableCell>{t('supplier.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} align="center">{t('supplier.loading')}</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={5}>{t('supplier.noData')}</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.currency}</TableCell>
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
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[10, 20, 50]}
      />
      <SupplierFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingSupplier(null); }}
        onSubmit={editingSupplier ? handleUpdate : handleAdd}
        initialValues={editingSupplier || undefined}
      />
    </Box>
  );
};

export default SupplierPage;


