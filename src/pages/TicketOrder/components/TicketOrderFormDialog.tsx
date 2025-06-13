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
import type { TicketOrder } from '../../../api/ticket-order/types';
import { useTranslation } from 'react-i18next';

interface TicketOrderFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<TicketOrder>) => void;
  form: Partial<TicketOrder>;
  setForm: React.Dispatch<React.SetStateAction<Partial<TicketOrder>>>;
  editingId: string | null;
}

const TicketOrderFormDialog: React.FC<TicketOrderFormDialogProps> = ({
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
        <DialogTitle>{editingId ? t('ticketOrder.edit') : t('ticketOrder.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('ticketOrder.bookerName')}
            fullWidth
            value={form.bookerName || ''}
            onChange={e => setForm(f => ({ ...f, bookerName: e.target.value }))}
            required
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.bookerContact')}
            fullWidth
            value={form.bookerContact || ''}
            onChange={e => setForm(f => ({ ...f, bookerContact: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.pnr')}
            fullWidth
            value={form.pnr || ''}
            onChange={e => setForm(f => ({ ...f, pnr: e.target.value }))}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">{t('ticketOrder.status')}</InputLabel>
            <Select
              labelId="status-label"
              label={t('ticketOrder.status')}
              value={form.status ?? 0}
              onChange={e => setForm(f => ({ ...f, status: Number(e.target.value) }))}
            >
              <MenuItem value={0}>{t('ticketOrder.status_0')}</MenuItem>
              <MenuItem value={1}>{t('ticketOrder.status_1')}</MenuItem>
              <MenuItem value={2}>{t('ticketOrder.status_2')}</MenuItem>
              <MenuItem value={3}>{t('ticketOrder.status_3')}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{editingId ? t('update') : t('add')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TicketOrderFormDialog;

