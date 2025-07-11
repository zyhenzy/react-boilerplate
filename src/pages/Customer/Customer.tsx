import React, { useEffect, useState } from 'react';
import type { Customer } from "../../api/customer/types";
import {createCustomer, enableCustomer, getCustomerDetail, getCustomerList, updateCustomer} from "../../api/customer";
import { Button, Table, Switch, Pagination, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
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

  const handleEdit = async (customer: Customer) => {
    const detail = await getCustomerDetail(customer.id!);
    setEditingCustomer(detail);
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

  const columns = [
    { title: t('customer.name'), dataIndex: 'name', key: 'name' },
    { title: t('customer.contact'), dataIndex: 'contact', key: 'contact' },
    { title: t('customer.countryCode'), dataIndex: 'countryCode', key: 'countryCode' },
    { title: t('customer.currency'), dataIndex: 'currency', key: 'currency' },
    { title: t('customer.invoiceHeader'), dataIndex: 'invoiceHeader', key: 'invoiceHeader' },
    { title: t('customer.invoiceTaxNumber'), dataIndex: 'invoiceTaxNumber', key: 'invoiceTaxNumber' },
    {
      title: t('customer.enable'),
      dataIndex: 'enable',
      key: 'enable',
      render: (enable: boolean, record: Customer) => (
        <Switch checked={enable} onChange={() => handleEnable(record)} disabled={loading} />
      ),
    },
    {
      title: t('customer.actions'),
      key: 'actions',
      render: (_: any, record: Customer) => (
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
        <Typography.Title level={4} style={{ margin: 0 }}>{t('customer.title')}</Typography.Title>
        <Button type="primary" onClick={handleAdd}>{t('customer.add')}</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
        locale={{
          emptyText: loading ? t('customer.loading') : t('customer.noData'),
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <Pagination
          current={pageIndex + 1}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          pageSizeOptions={[10, 20, 50]}
          onChange={(page, size) => { setPageIndex(page - 1); if (size) setPageSize(size); }}
          showTotal={total => `${t('common.rowsPerPage')}: ${total}`}
        />
      </div>
      <CustomerFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingCustomer(null); }}
        onSubmit={handleSubmit}
        form={editingCustomer || { name: '', contact: '', enable: true }}
        setForm={f => setEditingCustomer(f as Partial<Customer> | null)}
        editingId={editingCustomer?.id || null}
      />
    </div>
  );
};

export default CustomerPage;
