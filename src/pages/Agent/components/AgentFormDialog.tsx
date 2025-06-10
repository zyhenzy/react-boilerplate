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
import type { Agent } from '../../../api/agent/types';
import { COUNTRY_OPTIONS } from '../../../constants/countryCodes';

interface AgentFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: Partial<Agent>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Agent>>>;
  editingId: string | null;
}

const AgentFormDialog: React.FC<AgentFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId
}) => (
  <Dialog open={open} onClose={onClose}>
    <form onSubmit={onSubmit}>
      <DialogTitle>{editingId ? '编辑Agent' : '新增Agent'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="名称"
          fullWidth
          value={form.name || ''}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          margin="dense"
          label="联系方式"
          fullWidth
          value={form.contact || ''}
          onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
          required
          inputProps={{ maxLength: 50 }}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="countryCode-label">国家代码</InputLabel>
          <Select
            labelId="countryCode-label"
            label="国家代码"
            value={form.countryCode || ''}
            onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}
            displayEmpty
          >
            <MenuItem value=""><em>无</em></MenuItem>
            {COUNTRY_OPTIONS.map(option => (
              <MenuItem key={option.code} value={option.code}>{option.display}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="城市代码"
          fullWidth
          value={form.cityCode || ''}
          onChange={e => setForm(f => ({ ...f, cityCode: e.target.value }))}
          inputProps={{ maxLength: 3 }}
        />
        <TextField
          margin="dense"
          label="币种"
          fullWidth
          value={form.currency || ''}
          onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
          inputProps={{ maxLength: 3 }}
        />
        <TextField
          margin="dense"
          label="发票抬头"
          fullWidth
          value={form.invoiceHeader || ''}
          onChange={e => setForm(f => ({ ...f, invoiceHeader: e.target.value }))}
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          margin="dense"
          label="发票税号"
          fullWidth
          value={form.invoiceTaxNumber || ''}
          onChange={e => setForm(f => ({ ...f, invoiceTaxNumber: e.target.value }))}
          inputProps={{ maxLength: 50 }}
        />
        <div style={{marginTop: 8}}>
          <label style={{display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: 8}}>启用</span>
            <input
              type="checkbox"
              checked={form.enable ?? true}
              onChange={e => setForm(f => ({ ...f, enable: e.target.checked }))}
            />
          </label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">取消</Button>
        <Button type="submit" variant="contained" color="primary">{editingId ? '更新' : '新增'}</Button>
      </DialogActions>
    </form>
  </Dialog>
);

export default AgentFormDialog;
