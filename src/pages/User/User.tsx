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
  IconButton,
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UserFormDialog from './components/UserFormDialog';
import { getUserList, addUser, updateUser, enableUser, getUserDetail } from '../../api/user';
import { getRoleOptions } from '../../api/basic';
import { useTranslation } from 'react-i18next';

const UserPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // 统一分页从0开始
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [roleOptions, setRoleOptions] = useState<{ value: string; label: string }[]>([]);

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

  const fetchRoleOptions = async () => {
    const res = await getRoleOptions();
    setRoleOptions(res || []);
  };

  useEffect(() => {
    fetchData();
    fetchRoleOptions();
    // eslint-disable-next-line
  }, [pageIndex, pageSize]);

  const handleAdd = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleEdit = async (user: any) => {
    setLoading(true);
    try {
      const res = await getUserDetail(user.id);
      console.log(res)
      debugger
      setEditingUser(res);
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
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
    setLoading(true);
    await enableUser({ id: user.id, enable: !user.enable });
    setLoading(false);
    fetchData();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>{t('user.title')}</h2>
        <Button variant="contained" onClick={handleAdd}>{t('user.add')}</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('user.userName')}</TableCell>
              <TableCell>{t('user.name')}</TableCell>
              <TableCell>{t('user.phoneNumber')}</TableCell>
              <TableCell>{t('user.countryNumber')}</TableCell>
              <TableCell>{t('user.enable')}</TableCell>
              <TableCell>{t('user.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} align="center">{t('user.loading')}</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={6}>{t('user.noData')}</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{item.countryNumber}</TableCell>
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
      />
      <UserFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingUser(null); }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!editingUser?.userName || !editingUser?.name) return;
          handleSubmit(editingUser);
        }}
        form={editingUser || { userName: '', name: '', enable: true }}
        setForm={f => setEditingUser(f as any)}
        editingId={editingUser?.id || null}
        roleOptions={roleOptions}
      />
    </Box>
  );
};

export default UserPage;
