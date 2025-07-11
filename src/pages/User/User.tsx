import React, { useEffect, useState } from 'react';
import { Button, Table, Switch, Pagination, Modal, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UserFormDialog from './components/UserFormDialog';
import { getUserList, addUser, updateUser, enableUser, getUserDetail } from '../../api/user';
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
  }, [pageIndex, pageSize]);

  const handleAdd = () => {
    setEditingUser({  enable: true });
    setDialogOpen(true);
  };

  const handleEdit = async (user: any) => {
    const res = await getUserDetail(user.id);
    const _res = Object.assign(res,{role:res.roles}) // fixme：查详情返回的是roles，新增的时候用的是role
    setEditingUser(_res);
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
    setData(prevData => prevData.map(item => item.id === user.id ? { ...item, enable: !item.enable } : item));
  };

  const columns = [
    {
      title: t('user.userName'),
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: t('user.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('user.phoneNumber'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: t('user.countryNumber'),
      dataIndex: 'countryNumber',
      key: 'countryNumber',
    },
    {
      title: t('user.enable'),
      dataIndex: 'enable',
      key: 'enable',
      render: (enable: boolean, record: any) => (
        <Switch checked={enable} onChange={() => handleEnable(record)} disabled={loading} />
      ),
    },
    {
      title: t('user.actions'),
      key: 'actions',
      render: (_: any, record: any) => (
        <Button
          icon={<EditOutlined />}
          size="small"
          onClick={() => handleEdit(record)}
          disabled={loading}
          type="link"
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>{t('user.title')}</Typography.Title>
        <Button type="primary" onClick={handleAdd}>{t('user.add')}</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
        locale={{
          emptyText: loading ? t('user.loading') : t('user.noData'),
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Pagination
          current={pageIndex + 1}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          pageSizeOptions={[10, 20, 50]}
          onChange={(page, size) => { setPageIndex(page - 1); setPageSize(size); }}
          showTotal={total => `${t('common.rowsPerPage')}: ${total}`}
        />
      </div>
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
      />
    </div>
  );
};

export default UserPage;
