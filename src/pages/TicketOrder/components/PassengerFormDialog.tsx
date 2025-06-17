import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { AddTicketOrderPassengerCommand } from '../../../api/ticket-order/types';

interface PassengerFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: AddTicketOrderPassengerCommand) => void;
  passenger?: AddTicketOrderPassengerCommand;
}

const PassengerFormDialog: React.FC<PassengerFormDialogProps> = ({ open, onClose, onSubmit, passenger }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<AddTicketOrderPassengerCommand>({});

  useEffect(() => {
    setForm(passenger || {});
  }, [passenger, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
        <DialogTitle>{passenger ? t('ticketOrder.editPassenger') : t('ticketOrder.addPassenger')}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={t('ticketOrder.passengerName')}
            fullWidth
            value={form.name || ''}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.englishName')}
            fullWidth
            value={form.englishName || ''}
            onChange={e => setForm(f => ({ ...f, englishName: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.certificateType')}
            fullWidth
            value={form.certificateType || ''}
            onChange={e => setForm(f => ({ ...f, certificateType: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.certificateNo')}
            fullWidth
            value={form.certificateNo || ''}
            onChange={e => setForm(f => ({ ...f, certificateNo: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.phoneNumber')}
            fullWidth
            value={form.phoneNumber || ''}
            onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.birthday')}
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.birthday || ''}
            onChange={e => setForm(f => ({ ...f, birthday: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.nationality')}
            fullWidth
            value={form.nationality || ''}
            onChange={e => setForm(f => ({ ...f, nationality: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.countryNumber')}
            fullWidth
            value={form.countryNumber || ''}
            onChange={e => setForm(f => ({ ...f, countryNumber: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.ticketNo')}
            fullWidth
            value={form.ticketNo || ''}
            onChange={e => setForm(f => ({ ...f, ticketNo: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{t('ok')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PassengerFormDialog;
