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
import type { RequestOrder } from '../../../api/request-order/types';
import { useTranslation } from 'react-i18next';

interface RequestOrderFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<RequestOrder>) => void;
  form: Partial<RequestOrder>;
  setForm: React.Dispatch<React.SetStateAction<Partial<RequestOrder>>>;
  editingId: string | null;
}

const RequestOrderFormDialog: React.FC<RequestOrderFormDialogProps> = ({
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
      <form onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
        <DialogTitle>{editingId ? t('requestOrder.edit') : t('requestOrder.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('requestOrder.dep')}
            fullWidth
            value={form.dep || ''}
            onChange={e => setForm(f => ({ ...f, dep: e.target.value }))}
            required
          />
          <TextField
            margin="dense"
            label={t('requestOrder.arr')}
            fullWidth
            value={form.arr || ''}
            onChange={e => setForm(f => ({ ...f, arr: e.target.value }))}
            required
          />
          <TextField
            margin="dense"
            label={t('requestOrder.phoneNumber')}
            fullWidth
            value={form.phoneNumber || ''}
            onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">{t('requestOrder.status')}</InputLabel>
            <Select
              labelId="status-label"
              label={t('requestOrder.status')}
              value={form.status ?? 0}
              onChange={e => setForm(f => ({ ...f, status: Number(e.target.value) }))}
            >
              <MenuItem value={0}>{t('requestOrder.status_0')}</MenuItem>
              <MenuItem value={1}>{t('requestOrder.status_1')}</MenuItem>
              <MenuItem value={2}>{t('requestOrder.status_2')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label={t('requestOrder.remark')}
            fullWidth
            value={form.remark || ''}
            onChange={e => setForm(f => ({ ...f, remark: e.target.value }))}
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{editingId ? t('update') : t('add')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RequestOrderFormDialog;
