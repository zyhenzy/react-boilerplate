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
import {IOption} from "../../../api/basic/types";
import { useTranslation } from 'react-i18next';

interface AgentFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: Partial<Agent>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Agent>>>;
  editingId: string | null;
  countryOptions: IOption[];
}

const AgentFormDialog: React.FC<AgentFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId,
  countryOptions
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>{editingId ? t('agent.edit') : t('agent.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('agent.name')}
            fullWidth
            value={form.name || ''}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('agent.contact')}
            fullWidth
            value={form.contact || ''}
            onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
            required
            inputProps={{ maxLength: 50 }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="countryCode-label">{t('agent.countryCode')}</InputLabel>
            <Select
              labelId="countryCode-label"
              label={t('agent.countryCode')}
              value={form.countryCode || ''}
              onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}
              displayEmpty
            >
              {countryOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label={t('agent.cityCode')}
            fullWidth
            value={form.cityCode || ''}
            onChange={e => setForm(f => ({ ...f, cityCode: e.target.value }))}
            inputProps={{ maxLength: 3 }}
          />
          <TextField
            margin="dense"
            label={t('agent.currency')}
            fullWidth
            value={form.currency || ''}
            onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
            inputProps={{ maxLength: 3 }}
          />
          <TextField
            margin="dense"
            label={t('agent.invoiceHeader')}
            fullWidth
            value={form.invoiceHeader || ''}
            onChange={e => setForm(f => ({ ...f, invoiceHeader: e.target.value }))}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('agent.invoiceTaxNumber')}
            fullWidth
            value={form.invoiceTaxNumber || ''}
            onChange={e => setForm(f => ({ ...f, invoiceTaxNumber: e.target.value }))}
            inputProps={{ maxLength: 50 }}
          />
          <div style={{marginTop: 8}}>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>{t('agent.enable')}</span>
              <input
                type="checkbox"
                checked={form.enable ?? true}
                onChange={e => setForm(f => ({ ...f, enable: e.target.checked }))}
              />
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel', '取消')}</Button>
          <Button type="submit" variant="contained" color="primary">{editingId ? t('update', '更新') : t('add', '新增')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AgentFormDialog;
