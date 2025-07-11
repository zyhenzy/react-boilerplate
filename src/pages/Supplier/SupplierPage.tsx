import React, { useEffect, useState } from 'react';
import { getSupplierList, createSupplier, updateSupplier, enableSupplier, getSupplierDetail } from '../../api/supplier';
import type { Supplier } from '../../api/supplier/types';
import SupplierFormDialog from './components/SupplierFormDialog';
import { Table, Button, Switch, Pagination, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
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

  const handlePageChange = (page: number, size?: number) => {
    setPageIndex(page - 1);
    if (size) setPageSize(size);
  };

  const handleAdd = async (values: Omit<Supplier, 'id'>) => {
    await createSupplier(values);
    setDialogOpen(false);
    fetchData();
  };

  const handleEdit = async (supplier: Supplier) => {
    const detail = await getSupplierDetail(supplier.id!);
    setEditingSupplier(detail);
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

  const columns = [
    { title: t('supplier.name'), dataIndex: 'name', key: 'name' },
    { title: t('supplier.contact'), dataIndex: 'contact', key: 'contact' },
    { title: t('supplier.currency'), dataIndex: 'currency', key: 'currency' },
    {
      title: t('supplier.enable'),
      dataIndex: 'enable',
      key: 'enable',
      render: (enable: boolean, record: Supplier) => (
        <Switch checked={enable} onChange={() => handleEnable(record)} disabled={loading} />
      ),
    },
    {
      title: t('supplier.actions'),
      key: 'actions',
      render: (_: any, record: Supplier) => (
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
    <div style={{ padding: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>{t('supplier.title')}</Typography.Title>
        <Button type="primary" onClick={() => { setEditingSupplier(null); setDialogOpen(true); }}>{t('supplier.add')}</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
        locale={{
          emptyText: loading ? t('supplier.loading') : t('supplier.noData'),
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <Pagination
          current={pageIndex + 1}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          pageSizeOptions={[10, 20, 50]}
          onChange={handlePageChange}
          showTotal={total => `${t('common.rowsPerPage')}: ${total}`}
        />
      </div>
      <SupplierFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingSupplier(null); }}
        onSubmit={editingSupplier ? handleUpdate : handleAdd}
        initialValues={editingSupplier || undefined}
      />
    </div>
  );
};

export default SupplierPage;
