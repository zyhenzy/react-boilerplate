import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { AddTicketOrderPassengerCommand } from '../../../api/ticket-order/types';
import type { IOption } from '../../../api/basic/types';

interface PassengerFormDialogProps {
  open: boolean;
  onClose: () => void;
  onPassengerSubmit: (values: AddTicketOrderPassengerCommand) => void;
  passenger?: AddTicketOrderPassengerCommand;
}

const PassengerFormDialog: React.FC<PassengerFormDialogProps> = ({ open, onClose, onPassengerSubmit, passenger }) => {
  const { t } = useTranslation();
  const certificateOptions = useSelector((state: any) => state.options.certificateOptions) as IOption[];
  const countryOptions = useSelector((state: any) => state.options.countryOptions) as IOption[];
  const countryCodeOptions = useSelector((state: any) => state.options.countryCodeOptions) as IOption[];
  const [form, setForm] = useState<AddTicketOrderPassengerCommand>({});

  useEffect(() => {
    setForm(passenger || {});
  }, [passenger, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); onPassengerSubmit(form); }}>
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
          <FormControl fullWidth margin="dense">
            <InputLabel>{t('ticketOrder.certificateType')}</InputLabel>
            <Select
              label={t('ticketOrder.certificateType')}
              value={form.certificateType || ''}
              onChange={e => setForm(f => ({ ...f, certificateType: e.target.value }))}
            >
              {certificateOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label={t('ticketOrder.certificateNo')}
            fullWidth
            value={form.certificateNo || ''}
            onChange={e => setForm(f => ({ ...f, certificateNo: e.target.value }))}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <FormControl style={{ minWidth: 120 }} margin="dense">
              <InputLabel>{t('ticketOrder.countryNumber')}</InputLabel>
              <Select
                label={t('ticketOrder.countryNumber')}
                value={form.countryNumber || ''}
                onChange={e => setForm(f => ({ ...f, countryNumber: e.target.value }))}
              >
                {countryOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>({opt.value}){opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label={t('ticketOrder.phoneNumber')}
              style={{ flex: 1 }}
              value={form.phoneNumber || ''}
              onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
            />
          </div>
          <TextField
            margin="dense"
            label={t('ticketOrder.birthday')}
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.birthday || ''}
            onChange={e => setForm(f => ({ ...f, birthday: e.target.value }))}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>{t('ticketOrder.nationality')}</InputLabel>
            <Select
              label={t('ticketOrder.nationality')}
              value={form.nationality || ''}
              onChange={e => setForm(f => ({ ...f, nationality: e.target.value }))}
            >
              {countryCodeOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label={t('ticketOrder.ticketNo')}
            fullWidth
            value={form.ticketNo || ''}
            onChange={e => setForm(f => ({ ...f, ticketNo: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{t('common.confirm')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PassengerFormDialog;
