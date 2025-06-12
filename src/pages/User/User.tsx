import React, { useEffect, useState } from 'react';
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
  CircularProgress,
  IconButton,
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UserFormDialog from './components/UserFormDialog';
import { getUserList, addUser, updateUser, enableUser } from '../../api/user';

const UserPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // 统一分页从0开始
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUserList({ PageIndex: pageIndex + 1, PageSize: pageSize });
      setData(res.data || []);
      setTotal(res.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [pageIndex, pageSize]);

  const handleAdd = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleSubmit = async (values: any) => {
    if (values.id) {
      await updateUser(values);
    } else {
      await addUser(values);
    }
    setDialogOpen(false);
    setEditingUser(null);
    fetchData();
  };

  const handleEnable = async (user: any) => {
    await enableUser({ id: user.id, enable: !user.enable });
    fetchData();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>用户管理</h2>
        <Button variant="contained" onClick={handleAdd}>新增</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>用户名</TableCell>
              <TableCell>姓名</TableCell>
              <TableCell>手机号</TableCell>
              <TableCell>国家号码</TableCell>
              <TableCell>启用</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} align="center"><CircularProgress size={24} /></TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={6}>暂无数据</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{item.countryNumber}</TableCell>
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
      <UserFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingUser(null); }}
        onSubmit={handleSubmit}
        form={editingUser || { enable: true }}
        setForm={setEditingUser}
        editingId={editingUser?.id || null}
      />
    </Box>
  );
};

export default UserPage;
