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
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AgentFormDialog from './components/AgentFormDialog';
import Pagination from '@mui/material/Pagination';

const AgentPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Agent>>({ name: '', contact: '', enable: true });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // 查询列表
  const fetchAgents = async (page = pageIndex, size = pageSize) => {
    setLoading(true);
    try {
      const res = await getAgentList({ PageIndex: page, PageSize: size });
      setAgents(res.data?.items || res.data || []);
      setTotal(res.data?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line
  }, [pageIndex, pageSize]);

  // 新增或更新
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) return;
    if (editingId) {
      await updateAgent({ ...form, id: editingId } as Agent);
    } else {
      await createAgent(form as Agent);
    }
    setForm({ name: '', contact: '', enable: true });
    setEditingId(null);
    setDialogOpen(false);
    fetchAgents(pageIndex, pageSize);
  };

  // 编辑
  const handleEdit = (agent: Agent) => {
    setForm(agent);
    setEditingId(agent.id!);
    setDialogOpen(true);
  };

  // 启用/禁用（逻辑删除）
  const handleDelete = async (id: string, enable: boolean) => {
    await enableAgent(id, !enable);
    fetchAgents();
  };

  // 打开新增弹窗
  const handleAdd = () => {
    setForm({ name: '', contact: '', enable: true });
    setEditingId(null);
    setDialogOpen(true);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" color="primary" onClick={handleAdd}>新增Agent</Button>
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
                  <TableCell>名称</TableCell>
                  <TableCell>联系方式</TableCell>
                  <TableCell>启用</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">暂无数据</TableCell>
                  </TableRow>
                ) : (
                  agents.map(agent => (
                    <TableRow key={agent.id}>
                      <TableCell>{agent.name}</TableCell>
                      <TableCell>{agent.contact}</TableCell>
                      <TableCell>
                        <Switch
                          checked={agent.enable}
                          onChange={() => handleDelete(agent.id!, agent.enable)}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(agent)} size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(agent.id!, agent.enable)} size="small">
                          <DeleteIcon />
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
      <AgentFormDialog
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

export default AgentPage;
