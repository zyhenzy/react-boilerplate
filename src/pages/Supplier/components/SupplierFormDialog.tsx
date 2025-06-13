import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';
import type { Supplier } from '../../../api/supplier/types';
import {getImage, uploadImage} from '../../../api/basic';
import { Box } from '@mui/material';

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
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  React.useEffect(() => {
    setForm({
      id: initialValues?.id,
      name: initialValues?.name || '',
      contact: initialValues?.contact || '',
      currency: initialValues?.currency || '',
      enable: initialValues?.enable ?? true,
      logoId: initialValues?.logoId || '',
    });
  }, [initialValues, open]);

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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
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
          <TextField
            margin="dense"
            label={t('supplier.currency')}
            fullWidth
            value={form.currency}
            onChange={e => handleChange('currency', e.target.value)}
            inputProps={{ maxLength: 10 }}
          />
          <Box mb={2} display="flex" alignItems="center">
            {form.logoId ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 0,
                  height: 56,
                  width: 56,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: 1,
                  border: '2px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 4,
                    borderColor: '#1976d2',
                  },
                }}
                onClick={() => {
                  document.getElementById('logo-upload-input')?.click();
                }}
                title={t('supplier.changeAvatar', '点击更换头像')}
              >
                <img
                  src={getImage(form.logoId)}
                  alt="logo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            ) : (
              <Button
                variant="outlined"
                component="label"
                disabled={uploading}
                size="small"
                sx={{ height: 56, width: 56, borderRadius: '50%', minWidth: 0, p: 0, ml: 0 }}
              >
                <span style={{ fontSize: 12, color: '#888' }}>{uploading ? t('supplier.uploading', '上传中...') : t('supplier.upload', '上传头像')}</span>
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
              <Switch
                checked={form.enable}
                onChange={e => handleChange('enable', e.target.checked)}
              />
            }
            label={t('supplier.enable')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel', '取消')}</Button>
          <Button type="submit" variant="contained" color="primary">{initialValues ? t('update', '更新') : t('add', '新增')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SupplierFormDialog;
