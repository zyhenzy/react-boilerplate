import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';
import type { Supplier } from '../../../api/supplier/types';

interface SupplierFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Supplier, 'id'>) => void;
  initialValues?: Partial<Supplier>;
}

const SupplierFormDialog: React.FC<SupplierFormDialogProps> = ({ open, onClose, onSubmit, initialValues }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<Omit<Supplier, 'id'>>({
    name: initialValues?.name || '',
    contact: initialValues?.contact || '',
    currency: initialValues?.currency || '',
    enable: initialValues?.enable ?? true,
    logoId: initialValues?.logoId || '',
  });

  React.useEffect(() => {
    setForm({
      name: initialValues?.name || '',
      contact: initialValues?.contact || '',
      currency: initialValues?.currency || '',
      enable: initialValues?.enable ?? true,
      logoId: initialValues?.logoId || '',
    });
  }, [initialValues, open]);

  const handleChange = (key: keyof Omit<Supplier, 'id'>, value: any) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initialValues ? t('supplier.edit') : t('supplier.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('supplier.name')}
            fullWidth
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.contact')}
            fullWidth
            value={form.contact}
            onChange={e => handleChange('contact', e.target.value)}
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.currency')}
            fullWidth
            value={form.currency}
            onChange={e => handleChange('currency', e.target.value)}
            inputProps={{ maxLength: 10 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.enable}
                onChange={e => handleChange('enable', e.target.checked)}
              />
            }
            label={t('supplier.enable')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel', '取消')}</Button>
          <Button type="submit" variant="contained" color="primary">{initialValues ? t('update', '更新') : t('add', '新增')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SupplierFormDialog;
