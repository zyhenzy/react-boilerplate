import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import type { Supplier } from '../../../api/supplier/types';
import {getCityOptions, getImage, uploadImage} from '../../../api/basic';
import {Box, FormControl, MenuItem} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Autocomplete from "@mui/material/Autocomplete";
import {useSelector} from "react-redux";
import type {IOption} from "../../../api/basic/types";

interface SupplierFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Supplier) => void;
  initialValues?: Partial<Supplier>;
}

const SupplierFormDialog: React.FC<SupplierFormDialogProps> = ({ open, onClose, onSubmit, initialValues }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<Partial<Supplier>>({
    id: initialValues?.id,
    name: initialValues?.name || '',
    contact: initialValues?.contact || '',
    currency: initialValues?.currency || '',
    enable: initialValues?.enable ?? true,
    logoId: initialValues?.logoId || '',
    countryCode: initialValues?.countryCode || '',
    cityCode: initialValues?.cityCode || '',
    bank: initialValues?.bank || '',
    bankAddress: initialValues?.bankAddress || '',
    bankPostalCode: initialValues?.bankPostalCode || '',
    bankSwiftCode: initialValues?.bankSwiftCode || '',
    bankAccount: initialValues?.bankAccount || '',
    bankAccountName: initialValues?.bankAccountName || '',
    remark: initialValues?.remark || '',
    products: initialValues?.products || [],
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const countryCodeOptions = useSelector((state: any) => state.options.countryCodeOptions) as IOption[];
  const productsOptions = useSelector((state: any) => state.options.productOptions) as IOption[];
  const [cityOptions,setCityOptions] = useState<any[]>([])

  useEffect(() => {
    if (form.countryCode) {
      fetchCityOptions(form.countryCode);
    } else {
      setCityOptions([]);
    }
  }, [form.countryCode]);


  React.useEffect(() => {
    setForm({
      id: initialValues?.id,
      name: initialValues?.name || '',
      contact: initialValues?.contact || '',
      currency: initialValues?.currency || '',
      enable: initialValues?.enable ?? true,
      logoId: initialValues?.logoId || '',
      countryCode: initialValues?.countryCode || '',
      cityCode: initialValues?.cityCode || '',
      bank: initialValues?.bank || '',
      bankAddress: initialValues?.bankAddress || '',
      bankPostalCode: initialValues?.bankPostalCode || '',
      bankSwiftCode: initialValues?.bankSwiftCode || '',
      bankAccount: initialValues?.bankAccount || '',
      bankAccountName: initialValues?.bankAccountName || '',
      remark: initialValues?.remark || '',
      products: initialValues?.products || [],
    });
  }, [initialValues, open]);

  const fetchCityOptions = async (countryCode: string) => {
    setCityOptions([]);
    const res = await getCityOptions({country:countryCode});
    setCityOptions(res)
  }

  const handleChange = (key: keyof Supplier, value: any) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (form.id) {
        formData.append('id', String(form.id));
      }
      const imageId = await uploadImage(formData);
      setForm(f => ({ ...f, logoId: imageId }));
    } catch (err: any) {
      setUploadError(err?.message || '上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 保证 id 字段传递
    onSubmit(form as Supplier);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initialValues ? t('supplier.edit') : t('supplier.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('supplier.name')}
            fullWidth
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.contact')}
            fullWidth
            value={form.contact}
            onChange={e => handleChange('contact', e.target.value)}
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
            label={t('supplier.currency')}
            fullWidth
            value={form.currency}
            onChange={e => handleChange('currency', e.target.value)}
            required
            inputProps={{ maxLength: 10 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.bank')}
            fullWidth
            value={form.bank}
            onChange={e => handleChange('bank', e.target.value)}
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.bankAddress')}
            fullWidth
            value={form.bankAddress}
            onChange={e => handleChange('bankAddress', e.target.value)}
            required
            inputProps={{ maxLength: 100 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.bankPostalCode')}
            fullWidth
            value={form.bankPostalCode}
            onChange={e => handleChange('bankPostalCode', e.target.value)}
            required
            inputProps={{ maxLength: 20 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.bankSwiftCode')}
            fullWidth
            value={form.bankSwiftCode}
            onChange={e => handleChange('bankSwiftCode', e.target.value)}
            required
            inputProps={{ maxLength: 20 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.bankAccount')}
            fullWidth
            value={form.bankAccount}
            onChange={e => handleChange('bankAccount', e.target.value)}
            required
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.bankAccountName')}
            fullWidth
            value={form.bankAccountName}
            onChange={e => handleChange('bankAccountName', e.target.value)}
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            margin="dense"
            label={t('supplier.remark')}
            fullWidth
            multiline
            minRows={2}
            value={form.remark}
            onChange={e => handleChange('remark', e.target.value)}
            inputProps={{ maxLength: 200 }}
          />
          <TextField
            select
            margin="dense"
            label={t('supplier.products')}
            fullWidth
            SelectProps={{ multiple: true }}
            value={form.products || []}
            onChange={e => handleChange('products', e.target.value)}
            required
          >
            {productsOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </TextField>

          <Box mb={2} display="flex" alignItems="center" justifyContent="center">
            {form.logoId ? (
                <Box
                    sx={{
                      width: 300,
                      height: 300,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 1,
                      border: '2px solid #e0e0e0',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.2s',
                      '&:hover': {
                        boxShadow: 4,
                        borderColor: '#1976d2',
                      },
                      m: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#fafafa',
                      position: 'relative',
                    }}
                    onClick={() => {
                      document.getElementById('logo-upload-input')?.click();
                    }}
                    title={t('supplier.changeAvatar')}
                >
                  <img
                      src={getImage(form.logoId)}
                      alt="logo"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                  <Button
                      size="small"
                      sx={{ position: 'absolute', right: 8, bottom: 8, minWidth: 0, p: 0.5, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: '50%' }}
                      onClick={e => { e.stopPropagation(); setPreviewOpen(true); }}
                      title="放大预览"
                  >
                    <ZoomInIcon fontSize="small" />
                  </Button>
                </Box>
            ) : (
                <Button
                    variant="outlined"
                    component="label"
                    disabled={uploading}
                    size="large"
                    sx={{ height: 300, width: 300, borderRadius: 2, minWidth: 0, p: 0, ml: 0, m: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}
                >
                  <span style={{ fontSize: 16, color: '#888', textAlign: 'center', width: '100%' }}>{uploading ? t('supplier.uploading') : t('supplier.upload')}</span>
                  <input
                      id="logo-upload-input"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                  />
                </Button>
            )}
            <input
                id="logo-upload-input"
                type="file"
                accept="image/*"
                hidden
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {uploadError && <span style={{ color: 'red', marginLeft: 16, fontSize: 13 }}>{uploadError}</span>}
          </Box>
          <FormControlLabel
              control={
                <Checkbox
                    checked={!!form.enable}
                    onChange={e => handleChange('enable', e.target.checked)}
                    color="primary"
                />
              }
              label={t('supplier.enable')}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{initialValues ? t('common.update') : t('common.confirm')}</Button>
        </DialogActions>
      </form>
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="xl">
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#222' }}>
          <img src={getImage(form.logoId as string)} alt={t('supplier.upload') as string} style={{ width: '80vw', height: '80vh', background: '#fff', borderRadius: 8 }} />
          <Button onClick={() => setPreviewOpen(false)} sx={{ mt: 2 }} variant="contained">{t('common.close')}</Button>
        </Box>
      </Dialog>
    </Dialog>
  );
};

export default SupplierFormDialog;
