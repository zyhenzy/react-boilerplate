import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { Supplier } from '../../../api/supplier/types';

interface SupplierFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Supplier, 'id'>) => void;
  initialValues?: Partial<Supplier>;
}

const SupplierFormDialog: React.FC<SupplierFormDialogProps> = ({ open, onClose, onSubmit, initialValues }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>新增供应商</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="名称"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          label="联系方式"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          label="币种"
          name="currency"
          value={form.currency}
          onChange={handleChange}
          fullWidth
          required
        />
        <FormControlLabel
          control={<Switch checked={form.enable} name="enable" onChange={handleChange} />}
          label="启用"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSubmit} variant="contained">保存</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupplierFormDialog;
