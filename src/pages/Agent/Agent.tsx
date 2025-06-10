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
  CircularProgress,
  IconButton,
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AgentFormDialog from './components/AgentFormDialog';

const AgentPage: React.FC = () => {
  const [data, setData] = useState<Agent[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // 统一分页从0开始
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAgentList({ PageIndex: pageIndex + 1, PageSize: pageSize });
      setData(res.data?.items || []);
      setTotal(res.data?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
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
    await enableAgent(agent.id!, !agent.enable);
    fetchData();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>代理管理</h2>
        <Button variant="contained" onClick={handleAdd}>新增</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名称</TableCell>
              <TableCell>联系方式</TableCell>
              <TableCell>国家代码</TableCell>
              <TableCell>城市代码</TableCell>
              <TableCell>币种</TableCell>
              <TableCell>启用</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} align="center"><CircularProgress size={24} /></TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={7}>暂无数据</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.countryCode}</TableCell>
                  <TableCell>{item.cityCode}</TableCell>
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
      />
    </Box>
  );
};

export default AgentPage;
