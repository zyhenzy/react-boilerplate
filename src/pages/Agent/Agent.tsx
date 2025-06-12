import React, { useEffect, useState } from 'react';
import type { Agent } from "../../api/agent/types";
import { createAgent, enableAgent, getAgentList, updateAgent } from "../../api/agent";
import { getCountryOptions } from '../../api/basic';
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
import AgentFormDialog from './components/AgentFormDialog';
import { IOption } from "../../api/basic/types";
import { useTranslation } from 'react-i18next';

const AgentPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Agent[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // 统一分页从0开始
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [countryOptions, setCountryOptions] = useState<IOption[]>([]);

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

  // 获取国家选项
  const fetchCountryOptions = async () => {
    const res = await getCountryOptions();
    setCountryOptions(res);
  };

  useEffect(() => {
    fetchCountryOptions();
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  const handleAdd = () => {
    setEditingAgent(null);
    setDialogOpen(true);
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setDialogOpen(true);
  };

  const handleSubmit = async (values: Omit<Agent, 'id'> | Agent) => {
    if ((values as Agent).id) {
      await updateAgent(values as Agent);
    } else {
      await createAgent(values as Omit<Agent, 'id'>);
    }
    setDialogOpen(false);
    setEditingAgent(null);
    fetchData();
  };

  const handleEnable = async (agent: Agent) => {
    setLoading(true);
    await enableAgent(agent.id!, !agent.enable);
    setLoading(false);
    fetchData();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
              <TableCell>{t('agent.cityCode')}</TableCell>
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
                  <TableCell>{countryOptions.find(opt => opt.value === item.countryCode)?.label || item.countryCode}</TableCell>
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
      />
      <AgentFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingAgent(null); }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!editingAgent?.name || !editingAgent?.contact) return;
          handleSubmit(editingAgent as Agent);
        }}
        form={editingAgent || { name: '', contact: '', enable: true }}
        setForm={f => setEditingAgent(f as Agent | null)}
        editingId={editingAgent?.id || null}
        countryOptions={countryOptions}
      />
    </Box>
  );
};

export default AgentPage;
