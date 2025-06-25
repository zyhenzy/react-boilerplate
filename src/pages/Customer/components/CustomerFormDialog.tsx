import React, { useEffect } from 'react';
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
import type { Customer } from '../../../api/customer/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

interface CustomerFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: Partial<Customer>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Customer>>>;
  editingId: string | null;
}

const CustomerFormDialog: React.FC<CustomerFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId
}) => {
  const { t } = useTranslation();
  const countryOptions = useSelector((state: RootState) => state.options.countryOptions);

  useEffect(() => {
    if (form.enable === undefined) {
      setForm(f => ({ ...f, enable: true }));
    }
  }, [form.enable, setForm]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>{editingId ? t('customer.edit') : t('customer.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('customer.name')}
            fullWidth
            value={form.name || ''}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            inputProps={{ maxLength: 50 }}
          />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="countryCode-label">{t('customer.countryCode')}</InputLabel>
              <Select
                labelId="countryCode-label"
                label={t('customer.countryCode')}
                value={form.countryCode || ''}
                onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}
                displayEmpty
              >
                {countryOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}（{option.value}）</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label={t('customer.contact')}
              value={form.contact || ''}
              onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
              required
              inputProps={{ maxLength: 50 }}
              style={{ flex: 1 }}
            />
          </div>
          <TextField
            margin="dense"
            label={t('customer.currency')}
            fullWidth
            value={form.currency || ''}
            onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
            inputProps={{ maxLength: 3 }}
          />
          <TextField
            margin="dense"
            label={t('customer.invoiceHeader')}
            fullWidth
            value={form.invoiceHeader || ''}
            onChange={e => setForm(f => ({ ...f, invoiceHeader: e.target.value }))}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('customer.invoiceTaxNumber')}
            fullWidth
            value={form.invoiceTaxNumber || ''}
            onChange={e => setForm(f => ({ ...f, invoiceTaxNumber: e.target.value }))}
            inputProps={{ maxLength: 50 }}
          />
          <div style={{marginTop: 8}}>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>{t('customer.enable')}</span>
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

export default CustomerFormDialog;
