import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import type { AgentOrder, AgentOrderType, AgentOrderStatus } from '../../api/agent-order/types';
import { useTranslation } from 'react-i18next';

interface AgentOrderFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: Partial<AgentOrder>;
  setForm: React.Dispatch<React.SetStateAction<Partial<AgentOrder>>>;
  editingId: string | null;
}

const AgentOrderFormDialog: React.FC<AgentOrderFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>{editingId ? t('agentOrder.edit', '编辑订单') : t('agentOrder.add', '新增订单')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('agentOrder.orderNo', '订单号')}
            fullWidth
            value={form.orderNo || ''}
            onChange={e => setForm(f => ({ ...f, orderNo: e.target.value }))}
            required
            inputProps={{ maxLength: 50 }}
            disabled={!!editingId}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="type-label">{t('agentOrder.type', '订单类型')}</InputLabel>
            <Select
              labelId="type-label"
              label={t('agentOrder.type', '订单类型')}
              value={form.type ?? ''}
              onChange={e => setForm(f => ({ ...f, type: e.target.value as AgentOrderType }))}
              required
            >
              <MenuItem value={0}>{t('agentOrder.type0', '普通')}</MenuItem>
              <MenuItem value={1}>{t('agentOrder.type1', '改期')}</MenuItem>
              <MenuItem value={2}>{t('agentOrder.type2', '退票')}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">{t('agentOrder.status', '订单状态')}</InputLabel>
            <Select
              labelId="status-label"
              label={t('agentOrder.status', '订单状态')}
              value={form.status ?? ''}
              onChange={e => setForm(f => ({ ...f, status: e.target.value as AgentOrderStatus }))}
              required
            >
              <MenuItem value={0}>{t('agentOrder.status0', '待处理')}</MenuItem>
              <MenuItem value={1}>{t('agentOrder.status1', '已接受')}</MenuItem>
              <MenuItem value={2}>{t('agentOrder.status2', '已拒绝')}</MenuItem>
              <MenuItem value={3}>{t('agentOrder.status3', '已出票')}</MenuItem>
              <MenuItem value={4}>{t('agentOrder.status4', '已完成')}</MenuItem>
              <MenuItem value={5}>{t('agentOrder.status5', '已取消')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label={t('agentOrder.price', '票面价')}
            fullWidth
            type="number"
            value={form.price ?? ''}
            onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
            required
          />
          <TextField
            margin="dense"
            label={t('agentOrder.tax', '税费')}
            fullWidth
            type="number"
            value={form.tax ?? ''}
            onChange={e => setForm(f => ({ ...f, tax: Number(e.target.value) }))}
            required
          />
          <TextField
            margin="dense"
            label={t('agentOrder.serviceCharge', '服务费')}
            fullWidth
            type="number"
            value={form.serviceCharge ?? ''}
            onChange={e => setForm(f => ({ ...f, serviceCharge: Number(e.target.value) }))}
            required
          />
          <TextField
            margin="dense"
            label={t('agentOrder.pnr', 'PNR')}
            fullWidth
            value={form.pnr || ''}
            onChange={e => setForm(f => ({ ...f, pnr: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('agentOrder.agentRemark', '代理备注')}
            fullWidth
            value={form.agentRemark || ''}
            onChange={e => setForm(f => ({ ...f, agentRemark: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('agentOrder.tcRemark', 'TC备注')}
            fullWidth
            value={form.tcRemark || ''}
            onChange={e => setForm(f => ({ ...f, tcRemark: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel', '取消')}</Button>
          <Button type="submit" variant="contained" color="primary">{editingId ? t('update', '更新') : t('add', '新增')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AgentOrderFormDialog;

