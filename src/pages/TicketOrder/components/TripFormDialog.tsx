import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { AddTicketOrderTripCommand } from '../../../api/ticket-order/types';

interface TripFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: AddTicketOrderTripCommand) => void;
  trip?: AddTicketOrderTripCommand;
}

const TripFormDialog: React.FC<TripFormDialogProps> = ({ open, onClose, onSubmit, trip }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<AddTicketOrderTripCommand>({});

  useEffect(() => {
    setForm(trip || {});
  }, [trip, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
        <DialogTitle>{trip ? t('ticketOrder.editFlight') : t('ticketOrder.addFlight')}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={t('ticketOrder.airline')}
            fullWidth
            value={form.airline || ''}
            onChange={e => setForm(f => ({ ...f, airline: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.flight')}
            fullWidth
            value={form.flight || ''}
            onChange={e => setForm(f => ({ ...f, flight: e.target.value }))}
            required
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.depCity')}
            fullWidth
            value={form.depCity || ''}
            onChange={e => setForm(f => ({ ...f, depCity: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.arrCity')}
            fullWidth
            value={form.arrCity || ''}
            onChange={e => setForm(f => ({ ...f, arrCity: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.depDate')}
            fullWidth
            value={form.depDate || ''}
            onChange={e => setForm(f => ({ ...f, depDate: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.arrDate')}
            fullWidth
            value={form.arrDate || ''}
            onChange={e => setForm(f => ({ ...f, arrDate: e.target.value }))}
          />
          {/* 可根据需要继续补充更多字段 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{t('ok')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TripFormDialog;

