import React, {useEffect, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  Checkbox
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import type { Agent } from '../../../api/agent/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
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
  const countryCodeOptions = useSelector((state: RootState) => state.options.countryCodeOptions);
  const [cityOptions,setCityOptions] = useState<any[]>([])

  useEffect(() => {
    if (form.enable === undefined) {
      setForm(f => ({ ...f, enable: true }));
    }
  }, [form.enable, setForm]);

  useEffect(() => {
    if (form.countryCode) {
      fetchCityOptions(form.countryCode);
    } else {
      setCityOptions([]);
    }
  }, [form.countryCode]);

  const handleClose = () => {
    setCityOptions([])
    onClose()
  }

  const fetchCityOptions = async (countryCode: string) => {
    setCityOptions([]);
    const res = await getCityOptions({country:countryCode});
    setCityOptions(res)
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
          <TextField
              margin="dense"
              label={t('agent.contact')}
              fullWidth
              value={form.contact || ''}
              onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
              required
              inputProps={{ maxLength: 100 }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <FormControl style={{ minWidth: 180 }} margin="dense">
              <Autocomplete
                  options={countryCodeOptions}
                  getOptionLabel={opt => `${opt.label || ''}`}
                  filterOptions={(options, { inputValue }) =>
                      options.filter(opt =>
                          (opt.label && opt.label.includes(inputValue)) ||
                          (opt.labelEn && opt.labelEn.toLowerCase().includes(inputValue.toLowerCase())) ||
                          (opt.value && opt.value.includes(inputValue))
                      )
                  }
                  value={countryCodeOptions.find(opt => opt.value === form.countryCode) || null}
                  onChange={(_, newValue) => setForm(f => ({ ...f, countryCode: newValue ? newValue.value : '' }))}
                  renderInput={params => (
                      <TextField {...params} label={t('common.country')} margin="dense" fullWidth required />
                  )}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
              />
            </FormControl>
            <FormControl style={{ flex: 1 }} margin="dense">
              <Autocomplete
                options={cityOptions}
                getOptionLabel={opt => opt.label || ''}
                value={cityOptions.find(opt => opt.value === form.cityCode) || null}
                onChange={(_, newValue) => setForm(f => ({ ...f, cityCode: newValue ? newValue.value : '' }))}
                renderInput={(params) => (
                  <TextField {...params} label={t('common.city')} margin="dense" required />
                )}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                disabled={cityOptions.length === 0}
              />
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
            required
            inputProps={{ maxLength: 3 }}
          />
          <TextField
            margin="dense"
            label={t('agent.invoiceHeader')}
            fullWidth
            value={form.invoiceHeader || ''}
            onChange={e => setForm(f => ({ ...f, invoiceHeader: e.target.value }))}
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('agent.invoiceTaxNumber')}
            fullWidth
            value={form.invoiceTaxNumber || ''}
            onChange={e => setForm(f => ({ ...f, invoiceTaxNumber: e.target.value }))}
            required
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
