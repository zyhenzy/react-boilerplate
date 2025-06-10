import React, { useEffect, useState } from 'react';
import { getSupplierList, createSupplier, updateSupplier, enableSupplier } from '../../api/supplier';
import type { Supplier, SupplierQuery } from '../../api/supplier/types';
import SupplierFormDialog from './components/SupplierFormDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';

const SupplierPage: React.FC = () => {
  const [data, setData] = useState<Supplier[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // MUI分页从0开始
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const fetchData = async (params: SupplierQuery = {}) => {
    setLoading(true);
    try {
      const res = await getSupplierList({
        PageIndex: pageIndex + 1,
        PageSize: pageSize,
        ...params,
      });
      // 兼容 axios 返回结构
      // @ts-ignore
      const items = res.data?.items || res.items || [];
      // @ts-ignore
      const totalCount = res.data?.total || res.total || 0;
      setData(items);
      setTotal(totalCount);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [pageIndex, pageSize]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPageIndex(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    fetchData();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>供应商管理</h2>
        <Button variant="contained" onClick={() => { setEditingSupplier(null); setDialogOpen(true); }}>新增</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名称</TableCell>
              <TableCell>联系方式</TableCell>
              <TableCell>币种</TableCell>
              <TableCell>启用</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={24} /></TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={5}>暂无数据</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>
                    <Switch checked={item.enable} onChange={() => handleEnable(item)} />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(item)}><EditIcon /></IconButton>
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
