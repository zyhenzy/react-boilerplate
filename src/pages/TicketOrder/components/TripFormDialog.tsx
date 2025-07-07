import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import type { AddTicketOrderTripCommand } from '../../../api/ticket-order/types';

interface TripFormDialogProps {
  open: boolean;
  onClose: () => void;
  onTripSubmit: (values: AddTicketOrderTripCommand) => void;
  trip?: AddTicketOrderTripCommand;
}

const TripFormDialog: React.FC<TripFormDialogProps> = ({ open, onClose, onTripSubmit, trip }) => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState<AddTicketOrderTripCommand>({});

  useEffect(() => {
    setForm(trip || {});
  }, [trip, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); onTripSubmit(form); }}>
        <DialogTitle>{trip ? t('ticketOrder.editTrip') : t('ticketOrder.addTrip')}</DialogTitle>
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
          <div style={{ display: 'flex', gap: 8 }}>
            <TextField
              margin="dense"
              label={t('ticketOrder.depDate')}
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.depDate || ''}
              onChange={e => setForm(f => ({ ...f, depDate: e.target.value }))}
              style={{ flex: 1 }}
            />
            <TimePicker
              label={t('ticketOrder.depTime')}
              value={form.depTime ? dayjs(form.depTime, 'HH:mm') : null}
              onChange={value => setForm(f => ({ ...f, depTime: value ? value.format('HH:mm') : '' }))}
              ampm={false}
              slotProps={{
                textField: { margin: 'dense', style: { flex: 1 }, size: 'small' }
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <TextField
              margin="dense"
              label={t('ticketOrder.arrDate')}
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.arrDate || ''}
              onChange={e => setForm(f => ({ ...f, arrDate: e.target.value }))}
              style={{ flex: 1 }}
            />
            <TimePicker
              label={t('ticketOrder.arrTime')}
              value={form.arrTime ? dayjs(form.arrTime, 'HH:mm') : null}
              onChange={value => setForm(f => ({ ...f, arrTime: value ? value.format('HH:mm') : '' }))}
              ampm={false}
              slotProps={{
                textField: { margin: 'dense', style: { flex: 1 }, size: 'small' }
              }}
            />
          </div>
          <TextField
            margin="dense"
            label={t('ticketOrder.depAirport')}
            fullWidth
            value={form.depAirport || ''}
            onChange={e => setForm(f => ({ ...f, depAirport: e.target.value }))}
          />
          <TextField
              margin="dense"
              label={t('ticketOrder.depTerminal')}
              fullWidth
              value={form.depTerminal || ''}
              onChange={e => setForm(f => ({ ...f, depTerminal: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.arrAirport')}
            fullWidth
            value={form.arrAirport || ''}
            onChange={e => setForm(f => ({ ...f, arrAirport: e.target.value }))}
          />
          <TextField
              margin="dense"
              label={t('ticketOrder.arrTerminal')}
              fullWidth
              value={form.arrTerminal || ''}
              onChange={e => setForm(f => ({ ...f, arrTerminal: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.cabinLevel')}
            fullWidth
            value={form.cabinLevel || ''}
            onChange={e => setForm(f => ({ ...f, cabinLevel: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.planCabinCode')}
            fullWidth
            value={form.planCabinCode || ''}
            onChange={e => setForm(f => ({ ...f, planCabinCode: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.cabinCode')}
            fullWidth
            value={form.cabinCode || ''}
            onChange={e => setForm(f => ({ ...f, cabinCode: e.target.value }))}
          />


          <TextField
            margin="dense"
            label={t('ticketOrder.flyingTime')}
            fullWidth
            type="number"
            value={form.flyingTime || ''}
            onChange={e => setForm(f => ({ ...f, flyingTime: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.aircraft')}
            fullWidth
            value={form.aircraft || ''}
            onChange={e => setForm(f => ({ ...f, aircraft: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.meals')}
            fullWidth
            value={form.meals || ''}
            onChange={e => setForm(f => ({ ...f, meals: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.luggageTransportationRule')}
            fullWidth
            value={form.luggageTransportationRule || ''}
            onChange={e => setForm(f => ({ ...f, luggageTransportationRule: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.luggageHandRule')}
            fullWidth
            value={form.luggageHandRule || ''}
            onChange={e => setForm(f => ({ ...f, luggageHandRule: e.target.value }))}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel shrink>{t('ticketOrder.stop')}</InputLabel>
            <Select
              value={form.stop === undefined ? '' : form.stop ? 'true' : 'false'}
              label={t('ticketOrder.stop')}
              onChange={e => setForm(f => ({ ...f, stop: e.target.value === 'true' }))}
              displayEmpty
            >
              <MenuItem value="">{t('ticketOrder.pleaseSelect')}</MenuItem>
              <MenuItem value="true">{t('yes')}</MenuItem>
              <MenuItem value="false">{t('no')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label={t('ticketOrder.remark')}
            fullWidth
            multiline
            minRows={2}
            value={form.remark || ''}
            onChange={e => setForm(f => ({ ...f, remark: e.target.value }))}
          />
          {/*<TextField*/}
          {/*  margin="dense"*/}
          {/*  label={t('ticketOrder.price')}*/}
          {/*  fullWidth*/}
          {/*  type="number"*/}
          {/*  value={form.price || ''}*/}
          {/*  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}*/}
          {/*/>*/}
          {/*<TextField*/}
          {/*  margin="dense"*/}
          {/*  label={t('ticketOrder.airportFee')}*/}
          {/*  fullWidth*/}
          {/*  type="number"*/}
          {/*  value={form.airportFee || ''}*/}
          {/*  onChange={e => setForm(f => ({ ...f, airportFee: e.target.value }))}*/}
          {/*/>*/}
          {/*<TextField*/}
          {/*  margin="dense"*/}
          {/*  label={t('ticketOrder.fuelFee')}*/}
          {/*  fullWidth*/}
          {/*  type="number"*/}
          {/*  value={form.fuelFee || ''}*/}
          {/*  onChange={e => setForm(f => ({ ...f, fuelFee: e.target.value }))}*/}
          {/*/>*/}
          {/* 可根据需要继续补充更多字段 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{t('common.confirm')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TripFormDialog;
