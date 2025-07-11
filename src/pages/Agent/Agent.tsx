import React, { useEffect, useState } from 'react';
import type { Agent } from "../../api/agent/types";
import { createAgent, enableAgent, getAgentList, updateAgent } from "../../api/agent";
import { Button, Table, Switch, Pagination, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import AgentFormDialog from './components/AgentFormDialog';
import { useTranslation } from 'react-i18next';

const AgentPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Agent[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // 统一分页从0开始
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Partial<Agent> | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAgentList({ PageIndex: pageIndex + 1, PageSize: pageSize });
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
    setEditingAgent({ name: '', contact: '', enable: true });
    setDialogOpen(true);
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setDialogOpen(true);
  };

  const handleSubmit = async (values: Partial<Agent>) => {
    const submitValues = { ...values, enable: values.enable === undefined ? true : values.enable };
    if (submitValues.id) {
      await updateAgent(submitValues as Agent);
    } else {
      await createAgent(submitValues as Omit<Agent, 'id'>);
    }
    setDialogOpen(false);
    setEditingAgent(null);
    fetchData();
  };

  const handleEnable = async (agent: Agent) => {
    await enableAgent(agent.id!, !agent.enable);
    setData(prevData => prevData.map(item => item.id === agent.id ? { ...item, enable: !item.enable } : item));
  };

  const columns = [
    { title: t('agent.name'), dataIndex: 'name', key: 'name' },
    { title: t('agent.contact'), dataIndex: 'contact', key: 'contact' },
    { title: t('agent.countryCode'), dataIndex: 'countryCode', key: 'countryCode' },
    { title: t('common.city'), dataIndex: 'cityCode', key: 'cityCode' },
    { title: t('agent.currency'), dataIndex: 'currency', key: 'currency' },
    {
      title: t('agent.enable'),
      dataIndex: 'enable',
      key: 'enable',
      render: (enable: boolean, record: Agent) => (
        <Switch checked={enable} onChange={() => handleEnable(record)} disabled={loading} />
      ),
    },
    {
      title: t('agent.actions'),
      key: 'actions',
      render: (_: any, record: Agent) => (
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
        <Typography.Title level={4} style={{ margin: 0 }}>{t('agent.title')}</Typography.Title>
        <Button type="primary" onClick={handleAdd}>{t('agent.add')}</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
        locale={{
          emptyText: loading ? t('agent.loading') : t('agent.noData'),
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
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
      <AgentFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingAgent(null); }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!editingAgent?.name || !editingAgent?.contact) return;
          handleSubmit(editingAgent as Partial<Agent>);
        }}
        form={editingAgent || { name: '', contact: '', enable: true }}
        setForm={f => setEditingAgent(f as Partial<Agent> | null)}
        editingId={editingAgent?.id || null}
      />
    </div>
  );
};

export default AgentPage;
