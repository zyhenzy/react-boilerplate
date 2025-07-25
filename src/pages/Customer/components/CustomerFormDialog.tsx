import React, {useEffect, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Checkbox
} from '@mui/material';
import type { Customer } from '../../../api/customer/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Autocomplete from "@mui/material/Autocomplete";
import type {IOption} from "../../../api/basic/types";
import {getCityOptions} from "../../../api/basic";

interface CustomerFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: Partial<Customer>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Customer>>>;
  editingId: string | null;
}

const CustomerFormDialog: React.FC<CustomerFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId
}) => {
  const { t } = useTranslation();
  const countryCodeOptions = useSelector((state: any) => state.options.countryCodeOptions) as IOption[];
  const productsOptions = useSelector((state: any) => state.options.productOptions) as IOption[];
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

  const fetchCityOptions = async (countryCode: string) => {
    setCityOptions([]);
    const res = await getCityOptions({country:countryCode});
    setCityOptions(res)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogTitle>{editingId ? t('customer.edit') : t('customer.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('customer.name')}
            fullWidth
            value={form.name || ''}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            inputProps={{ maxLength: 50 }}
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
          <TextField
            margin="dense"
            label={t('customer.contact')}
            fullWidth
            value={form.contact || ''}
            onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
            required
          />
          <TextField
            margin="dense"
            label={t('customer.currency')}
            fullWidth
            value={form.currency || ''}
            onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
            required
            inputProps={{ maxLength: 3 }}
          />
          <TextField
            margin="dense"
            label={t('customer.invoiceHeader')}
            fullWidth
            value={form.invoiceHeader || ''}
            onChange={e => setForm(f => ({ ...f, invoiceHeader: e.target.value }))}
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('customer.invoiceTaxNumber')}
            fullWidth
            value={form.invoiceTaxNumber || ''}
            onChange={e => setForm(f => ({ ...f, invoiceTaxNumber: e.target.value }))}
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
              select
              margin="dense"
              label={t('customer.serviceFeeCountType')}
              fullWidth
              value={form.serviceFeeCountType}
              onChange={e => setForm(f => ({ ...f, serviceFeeCountType: Number(e.target.value) }))}
              required
          >
            <MenuItem value={0}>{t('customer.serviceFeeCountType_full')}</MenuItem>
            <MenuItem value={1}>{t('customer.serviceFeeCountType_ticket')}</MenuItem>
          </TextField>
          <TextField
              margin="dense"
              label={t('customer.serviceFeeRatio')}
              type="number"
              fullWidth
              value={form.serviceFeeRatio ?? ''}
              onChange={e => setForm(f => ({ ...f, serviceFeeRatio: Number(e.target.value) }))}
              required
              inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
              select
              margin="dense"
              label={t('customer.products')}
              fullWidth
              SelectProps={{ multiple: true }}
              value={form.products || []}
              onChange={e => setForm(f => ({ ...f, products: e.target.value as unknown as string[] }))}
              required
          >
            {productsOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </TextField>

          <div style={{marginTop: 8}}>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>{t('customer.enable')}</span>
              <Checkbox
                checked={form.enable ?? true}
                onChange={e => setForm(f => ({ ...f, enable: e.target.checked }))}
                color="primary"
                size="small"
                required
              />
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel', '取消')}</Button>
          <Button type="submit" variant="contained" color="primary">{editingId ? t('update', '更新') : t('add', '新增')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomerFormDialog;
