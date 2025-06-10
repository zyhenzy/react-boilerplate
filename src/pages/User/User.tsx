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
  Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UserFormDialog from './UserFormDialog';
import { getUserList, addUser, updateUser, enableUser } from '../../api/user';

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({ enable: true });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchUsers = async (page = pageIndex, size = pageSize) => {
    setLoading(true);
    try {
      const res = await getUserList({ PageIndex: page, PageSize: size });
      setUsers(res.data?.items || res.data || []);
      setTotal(res.data?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [pageIndex, pageSize]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userName || !form.name || !form.phoneNumber || !form.countryNumber) return;
    if (editingId) {
      await updateUser({ ...form, id: editingId });
    } else {
      await addUser(form);
    }
    setForm({ enable: true });
    setEditingId(null);
    setDialogOpen(false);
    fetchUsers(pageIndex, pageSize);
  };

  const handleEdit = (user: any) => {
    setForm(user);
    setEditingId(user.id);
    setDialogOpen(true);
  };

  const handleEnable = async (id: string, enable: boolean) => {
    await enableUser({ id, enable: !enable });
    fetchUsers(pageIndex, pageSize);
  };

  const handleAdd = () => {
    setForm({ enable: true });
    setEditingId(null);
    setDialogOpen(true);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" color="primary" onClick={handleAdd}>新增用户</Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>用户名</TableCell>
                  <TableCell>姓名</TableCell>
                  <TableCell>手机号</TableCell>
                  <TableCell>国家号码</TableCell>
                  <TableCell>性别</TableCell>
                  <TableCell>角色</TableCell>
                  <TableCell>启用</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">暂无数据</TableCell>
                  </TableRow>
                ) : (
                  users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>{user.countryNumber}</TableCell>
                      <TableCell>{user.sex}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Switch
                          checked={user.enable}
                          onChange={() => handleEnable(user.id, user.enable)}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(user)} size="small">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Pagination
              count={Math.ceil(total / pageSize) || 1}
              page={pageIndex}
              onChange={(_, value) => setPageIndex(value)}
              color="primary"
            />
          </Box>
        </>
      )}
      <UserFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingId(null); }}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        editingId={editingId}
      />
    </Box>
  );
};

export default UserPage;

