import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem
} from '@mui/material';
import type { RequestOrder } from '../../../api/request-order/types';
import { useTranslation } from 'react-i18next';
import PassengerList from './PassengerList';

interface RequestOrderFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<RequestOrder>) => void;
  form: Partial<RequestOrder>;
  setForm: React.Dispatch<React.SetStateAction<Partial<RequestOrder>>>;
  editingId: string | null;
  countryOptions: { label: string; value: string }[];
}

const RequestOrderFormDialog: React.FC<RequestOrderFormDialogProps> = ({
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
          <TextField
            select
            margin="dense"
            label={t('requestOrder.countryNumber')}
            fullWidth
            value={form.countryNumber || ''}
            onChange={e => setForm(f => ({ ...f, countryNumber: e.target.value }))}
          >
            {countryOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label={t('requestOrder.remark')}
            fullWidth
            value={form.remark || ''}
            onChange={e => setForm(f => ({ ...f, remark: e.target.value }))}
            multiline
            rows={2}
          />
          <PassengerList
            countryOptions={countryOptions}
            passengerList={form.passengerList || []}
            onChange={list => setForm(f => ({ ...f, passengerList: list }))}
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

