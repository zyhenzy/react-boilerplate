import React, { useEffect, useState } from 'react';
import type { Agent } from "../../api/agent/types";
import { createAgent, enableAgent, getAgentList, updateAgent } from "../../api/agent";
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

  return (
    <Box p={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <h2>{t('agent.title')}</h2>
        <Button variant="contained" onClick={handleAdd}>{t('agent.add')}</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('agent.name')}</TableCell>
              <TableCell>{t('agent.contact')}</TableCell>
              <TableCell>{t('agent.countryCode')}</TableCell>
              <TableCell>{t('agent.city')}</TableCell>
              <TableCell>{t('agent.currency')}</TableCell>
              <TableCell>{t('agent.enable')}</TableCell>
              <TableCell>{t('agent.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} align="center">{t('agent.loading')}</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={7}>{t('agent.noData')}</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.countryCode}</TableCell>
                  <TableCell>{item.cityCode}</TableCell>
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
        onPageChange={(_, newPage) => setPageIndex(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={e => { setPageSize(Number(e.target.value)); setPageIndex(0); }}
        rowsPerPageOptions={[10, 20, 50]}
        labelRowsPerPage={t('common.rowsPerPage')}
      />
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
    </Box>
  );
};

export default AgentPage;
