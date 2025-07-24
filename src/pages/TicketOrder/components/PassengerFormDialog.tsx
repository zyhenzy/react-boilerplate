import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { AddTicketOrderPassengerCommand } from '../../../api/ticket-order/types';
import type { IOption } from '../../../api/basic/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';

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
  const sexOptions = useSelector((state: any) => state.options.sexOptions) as IOption[];
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

          <DatePicker
              label={t('ticketOrder.validity')}
              value={form.validity ? dayjs(form.validity) : null}
              onChange={value => setForm(f => ({ ...f, validity: value ? dayjs(value).format('YYYY-MM-DD') : '' }))}
              openTo="year"
              views={['year', 'month', 'day']}
              slotProps={{ textField: { fullWidth: true, margin: 'dense',size:'small' } }}
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
          <DatePicker
              label={t('ticketOrder.birthday')}
              value={form.birthday ? dayjs(form.birthday) : null}
              onChange={value => setForm(f => ({ ...f, birthday: value ? dayjs(value).format('YYYY-MM-DD') : '' }))}
              openTo="year"
              views={['year', 'month', 'day']}
              slotProps={{ textField: { fullWidth: true, margin: 'dense',size:'small' } }}
          />
          <FormControl fullWidth margin="dense">
            <Autocomplete
              options={countryCodeOptions}
              getOptionLabel={opt => `${opt.label || ''}${opt.labelEn ? ' / ' + opt.labelEn : ''}${opt.value ? ' / ' + opt.value : ''}`}
              filterOptions={(options, { inputValue }) =>
                options.filter(opt =>
                  (opt.label && opt.label.includes(inputValue)) ||
                  (opt.labelEn && opt.labelEn.toLowerCase().includes(inputValue.toLowerCase())) ||
                  (opt.value && opt.value.includes(inputValue))
                )
              }
              value={countryCodeOptions.find(opt => opt.value === form.nationality) || null}
              onChange={(_, newValue) => setForm(f => ({ ...f, nationality: newValue ? newValue.value : '' }))}
              renderInput={params => (
                <TextField {...params} label={t('ticketOrder.nationality')} margin="dense" fullWidth />
              )}
              isOptionEqualToValue={(option, value) => option.value === value.value}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>{t('common.sex')}</InputLabel>
            <Select
              label={t('common.sex')}
              value={form.sex || ''}
              onChange={e => setForm(f => ({ ...f, sex: e.target.value }))}
            >
              {sexOptions.map(opt => (
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
