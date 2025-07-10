import React, {useEffect, useState} from 'react';
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
  FormControl,
  Checkbox
} from '@mui/material';
import type { Agent } from '../../../api/agent/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type {IOption} from "../../../api/basic/types";
import {getCityOptions} from "../../../api/basic";

interface AgentFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: Partial<Agent>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Agent>>>;
  editingId: string | null;
}

const AgentFormDialog: React.FC<AgentFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId
}) => {
  const { t } = useTranslation();
  const countryOptions = useSelector((state: RootState) => state.options.countryOptions);
  const countryCodeOptions = useSelector((state: any) => state.options.countryCodeOptions) as IOption[];
  const [cityOptions,setCityOptions] = useState<any[]>([])

  useEffect(() => {
    if (form.enable === undefined) {
      setForm(f => ({ ...f, enable: true }));
    }
  }, [form.enable, setForm]);

  const handleCountryChange = async (e: any) => {
    setCityOptions([])
    setForm(f => ({ ...f, country: e.target.value }))
    const res = await getCityOptions(e.target.value);
    setCityOptions(res)
  }

  const handleClose = () => {
    setCityOptions([])
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>{editingId ? t('agent.edit') : t('agent.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('agent.name')}
            fullWidth
            value={form.name || ''}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            inputProps={{ maxLength: 50 }}
          />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="countryCode-label">{t('agent.countryCode')}</InputLabel>
              <Select
                labelId="countryCode-label"
                label={t('agent.countryCode')}
                value={form.countryCode || ''}
                onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}
                displayEmpty
              >
                {countryOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}（{option.value}）</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label={t('agent.contact')}
              value={form.contact || ''}
              onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
              required
              inputProps={{ maxLength: 50 }}
              style={{ flex: 1 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <FormControl style={{ minWidth: 120 }} margin="dense">
              <InputLabel>{t('agent.country')}</InputLabel>
              <Select
                  label={t('ticketOrder.country')}
                  value={form.country || ''}
                  onChange={handleCountryChange}
              >
                {countryCodeOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ flex: 1 }} margin="dense">
              <InputLabel>{t('agent.city')}</InputLabel>
              <Select
                  label={t('agent.city')}
                  value={form.cityCode || ''}
                  disabled={cityOptions.length === 0}
                  onChange={e => setForm(f => ({ ...f, cityCode: e.target.value }))}
              >
                {cityOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/*原城市编码*/}
          {/*<TextField*/}
          {/*  margin="dense"*/}
          {/*  label={t('agent.cityCode')}*/}
          {/*  fullWidth*/}
          {/*  value={form.cityCode || ''}*/}
          {/*  onChange={e => setForm(f => ({ ...f, cityCode: e.target.value }))}*/}
          {/*  inputProps={{ maxLength: 3 }}*/}
          {/*/>*/}
          <TextField
            margin="dense"
            label={t('agent.currency')}
            fullWidth
            value={form.currency || ''}
            onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
            inputProps={{ maxLength: 3 }}
          />
          <TextField
            margin="dense"
            label={t('agent.invoiceHeader')}
            fullWidth
            value={form.invoiceHeader || ''}
            onChange={e => setForm(f => ({ ...f, invoiceHeader: e.target.value }))}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('agent.invoiceTaxNumber')}
            fullWidth
            value={form.invoiceTaxNumber || ''}
            onChange={e => setForm(f => ({ ...f, invoiceTaxNumber: e.target.value }))}
            inputProps={{ maxLength: 50 }}
          />
          <div style={{marginTop: 8}}>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>{t('agent.enable')}</span>
              <Checkbox
                checked={form.enable ?? true}
                onChange={e => setForm(f => ({ ...f, enable: e.target.checked }))}
                color="primary"
                size="small"
              />
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{editingId ? t('common.update') : t('common.confirm')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AgentFormDialog;
