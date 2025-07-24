import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import type { AddTicketOrderTripCommand } from '../../../api/ticket-order/types';
import {useSelector} from "react-redux";
import type {IOption} from "../../../api/basic/types";
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { getCityOptions } from '../../../api/basic';

interface TripFormDialogProps {
  open: boolean;
  onClose: () => void;
  onTripSubmit: (values: AddTicketOrderTripCommand) => void;
  trip?: AddTicketOrderTripCommand;
}

const TripFormDialog: React.FC<TripFormDialogProps> = ({ open, onClose, onTripSubmit, trip }) => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState<AddTicketOrderTripCommand>({});
  const [depCityOptions, setDepCityOptions] = useState<IOption[]>([]);
  const [arrCityOptions, setArrCityOptions] = useState<IOption[]>([]);
  const airlineOptions = useSelector((state: any) => state.options.airlineOptions) as IOption[];
  const airportOptions = useSelector((state: any) => state.options.airportOptions) as IOption[];
  const classTypeOptions = useSelector((state: any) => state.options.classTypeOptions) as IOption[];
  const mealsOptions = useSelector((state: any) => state.options.mealsOptions) as IOption[];

  useEffect(() => {
    setForm(trip || {});
  }, [trip, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); onTripSubmit(form); }}>
        <DialogTitle>{trip ? t('ticketOrder.editTrip') : t('ticketOrder.addTrip')}</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={airlineOptions}
            getOptionLabel={option => option.label || ''}
            value={airlineOptions.find(opt => opt.value === form.airline) || null}
            onChange={(_, newValue) => setForm(f => ({ ...f, airline: newValue ? newValue.value : '' }))}
            renderInput={params => (
              <TextField {...params} label={t('ticketOrder.airline')} margin="dense" fullWidth />
            )}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.flight')}
            fullWidth
            value={form.flight || ''}
            onChange={e => setForm(f => ({ ...f, flight: e.target.value }))}
            required
          />
          <Autocomplete
            options={depCityOptions}
            getOptionLabel={option => option.label || ''}
            value={depCityOptions.find(opt => opt.value === form.depCity) || null}
            onInputChange={async (_, value) => {
              if (value) {
                const opts = await getCityOptions({ keyword: value });
                setDepCityOptions(opts);
              } else {
                setDepCityOptions([]);
              }
            }}
            onChange={(_, newValue) => setForm(f => ({ ...f, depCity: newValue ? newValue.value : '' }))}
            renderInput={params => (
              <TextField {...params} label={t('ticketOrder.depCity')} margin="dense" fullWidth />
            )}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
          <Autocomplete
            options={arrCityOptions}
            getOptionLabel={option => option.label || ''}
            value={arrCityOptions.find(opt => opt.value === form.arrCity) || null}
            onInputChange={async (_, value) => {
              if (value) {
                const opts = await getCityOptions({ keyword: value });
                setArrCityOptions(opts);
              } else {
                setArrCityOptions([]);
              }
            }}
            onChange={(_, newValue) => setForm(f => ({ ...f, arrCity: newValue ? newValue.value : '' }))}
            renderInput={params => (
              <TextField {...params} label={t('ticketOrder.arrCity')} margin="dense" fullWidth />
            )}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
          {/*<TextField*/}
          {/*  margin="dense"*/}
          {/*  label={t('ticketOrder.depCity')}*/}
          {/*  fullWidth*/}
          {/*  value={form.depCity || ''}*/}
          {/*  onChange={e => setForm(f => ({ ...f, depCity: e.target.value }))}*/}
          {/*/>*/}
          {/*<TextField*/}
          {/*  margin="dense"*/}
          {/*  label={t('ticketOrder.arrCity')}*/}
          {/*  fullWidth*/}
          {/*  value={form.arrCity || ''}*/}
          {/*  onChange={e => setForm(f => ({ ...f, arrCity: e.target.value }))}*/}
          {/*/>*/}
          <div style={{ display: 'flex', gap: 8 }}>
            <DatePicker
              label={t('ticketOrder.depDate')}
              value={form.depDate ? dayjs(form.depDate) : null}
              onChange={value => setForm(q => ({ ...q, depDate: value ? dayjs(value).format('YYYY-MM-DD') : '' }))}
              openTo="year"
              views={['year', 'month', 'day']}
              slotProps={{ textField: { margin: 'dense',size:'small',style:{ flex: 1 } } }}
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
            <DatePicker
              label={t('ticketOrder.arrDate')}
              value={form.arrDate ? dayjs(form.arrDate) : null}
              onChange={value => setForm(q => ({ ...q, arrDate: value ? dayjs(value).format('YYYY-MM-DD') : '' }))}
              openTo="year"
              views={['year', 'month', 'day']}
              slotProps={{ textField: { margin: 'dense',size:'small',style:{ flex: 1 } } }}
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
          <Autocomplete
              options={airportOptions}
              getOptionLabel={option => option.label || ''}
              value={airportOptions.find(opt => opt.value === form.depAirport) || null}
              onChange={(_, newValue) => setForm(f => ({ ...f, depAirport: newValue ? newValue.value : '' }))}
              renderInput={params => (
                  <TextField {...params} label={t('ticketOrder.depAirport')} margin="dense" fullWidth />
              )}
              isOptionEqualToValue={(option, value) => option.value === value.value}
          />
          <TextField
              margin="dense"
              label={t('ticketOrder.depTerminal')}
              fullWidth
              value={form.depTerminal || ''}
              onChange={e => setForm(f => ({ ...f, depTerminal: e.target.value }))}
          />
          <Autocomplete
              options={airportOptions}
              getOptionLabel={option => option.label || ''}
              value={airportOptions.find(opt => opt.value === form.arrAirport) || null}
              onChange={(_, newValue) => setForm(f => ({ ...f, arrAirport: newValue ? newValue.value : '' }))}
              renderInput={params => (
                  <TextField {...params} label={t('ticketOrder.arrAirport')} margin="dense" fullWidth />
              )}
              isOptionEqualToValue={(option, value) => option.value === value.value}
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
              select
              fullWidth
              value={form.cabinLevel || ''}
              onChange={e => setForm((f: any) => ({ ...f, cabinLevel: e.target.value }))}
          >
            {classTypeOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
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
          {/*<TextField*/}
          {/*  margin="dense"*/}
          {/*  label={t('ticketOrder.flyingTime')}*/}
          {/*  fullWidth*/}
          {/*  type="number"*/}
          {/*  value={form.flyingTime || ''}*/}
          {/*  onChange={e => setForm(f => ({ ...f, flyingTime: e.target.value }))}*/}
          {/*/>*/}
          <TimePicker
              label={t('ticketOrder.flyingTime')}
              value={form.flyingTime ? dayjs(form.flyingTime, 'HH:mm') : null}
              onChange={value => setForm(f => ({ ...f, flyingTime: value ? value.format('HH:mm') : '' }))}
              ampm={false}
              slotProps={{
                textField: { margin: 'dense', fullWidth: true,size:'small' }
              }}
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
              select
              fullWidth
              value={form.meals || ''}
              onChange={e => setForm((f: any) => ({ ...f, meals: e.target.value }))}
          >
            {mealsOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
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
          {form.stop && <>
            <Autocomplete
              options={airportOptions}
              getOptionLabel={option => option.label || ''}
              value={airportOptions.find(opt => opt.value === form.stopAirport) || null}
              onChange={(_, newValue) => setForm(f => ({ ...f, stopAirport: newValue ? newValue.value : '' }))}
              renderInput={params => (
                  <TextField {...params} label={t('ticketOrder.stopAirport')} margin="dense" fullWidth />
              )}
              isOptionEqualToValue={(option, value) => option.value === value.value}
            />
            <TimePicker
                label={t('ticketOrder.stopTime')}
                value={form.stopTime ? dayjs(form.stopTime, 'HH:mm') : null}
                onChange={value => setForm(f => ({ ...f, stopTime: value ? value.format('HH:mm') : '' }))}
                ampm={false}
                slotProps={{ textField: { margin: 'dense', fullWidth: true } }}
            />
          </>}
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

