import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  editingId: string | null;
  roleOptions: { value: string; label: string }[];
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId,
  roleOptions
}) => {
  const { t } = useTranslation();

  const sexOptions = [
    { value: 'M', label: t('user.sex_m', '男') },
    { value: 'F', label: t('user.sex_f', '女') },
    { value: 'O', label: t('user.sex_o', '其他') },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>{editingId ? t('user.edit') : t('user.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('user.userName')}
            fullWidth
            value={form.userName || ''}
            onChange={e => setForm((f: any) => ({ ...f, userName: e.target.value }))}
            required
            inputProps={{ maxLength: 25 }}
          />
          <TextField
            margin="dense"
            label={t('user.name')}
            fullWidth
            value={form.name || ''}
            onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
            required
            inputProps={{ maxLength: 25 }}
          />
          <TextField
            margin="dense"
            label={t('user.phoneNumber')}
            fullWidth
            value={form.phoneNumber || ''}
            onChange={e => setForm((f: any) => ({ ...f, phoneNumber: e.target.value }))}
            required
            inputProps={{ maxLength: 25 }}
          />
          <TextField
            margin="dense"
            label={t('user.countryNumber')}
            fullWidth
            value={form.countryNumber || ''}
            onChange={e => setForm((f: any) => ({ ...f, countryNumber: e.target.value }))}
            required
            inputProps={{ maxLength: 5 }}
          />
          <TextField
            margin="dense"
            label={t('user.sex')}
            select
            fullWidth
            value={form.sex || ''}
            onChange={e => setForm((f: any) => ({ ...f, sex: e.target.value }))}
          >
            {sexOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label={t('user.role')}
            select
            fullWidth
            value={form.role || ''}
            onChange={e => setForm((f: any) => ({ ...f, role: e.target.value }))}
          >
            {roleOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
          {!editingId && (
            <TextField
              margin="dense"
              label={t('user.password')}
              type="password"
              fullWidth
              value={form.password || ''}
              onChange={e => setForm((f: any) => ({ ...f, password: e.target.value }))}
              required
            />
          )}
          <FormControlLabel
            control={
              <Switch
                checked={form.enable ?? true}
                onChange={e => setForm((f: any) => ({ ...f, enable: e.target.checked }))}
              />
            }
            label={t('user.enable')}
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

export default UserFormDialog;
