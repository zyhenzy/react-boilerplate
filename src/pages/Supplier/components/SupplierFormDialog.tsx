import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import type { Supplier } from '../../../api/supplier/types';
import { getCityOptions, getImage, uploadImage } from '../../../api/basic';
import { useSelector } from 'react-redux';
import type { IOption } from '../../../api/basic/types';

const { Option } = Select;

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
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const countryCodeOptions = useSelector((state: any) => state.options.countryCodeOptions) as IOption[];
  const [cityOptions, setCityOptions] = useState<any[]>([]);

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

  const handleCountryChange = (value: string) => {
    setCityOptions([]);
    setForm(f => ({ ...f, countryCode: value, cityCode: '' }));
    if (value) {
      getCityOptions(value).then(res => setCityOptions(res));
    }
  };

  const handleSubmit = () => {
    onSubmit(form as Supplier);
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title={initialValues ? t('supplier.edit') : t('supplier.add')} destroyOnClose>
      <Form initialValues={form} onFinish={handleSubmit} layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item label={t('supplier.name')} name="name" rules={[{ required: true, message: t('supplier.name') + t('common.required') }]}> <Input value={form.name} onChange={e => handleChange('name', e.target.value)} maxLength={50} /> </Form.Item>
        <Form.Item label={t('supplier.contact')} name="contact" rules={[{ required: true, message: t('supplier.contact') + t('common.required') }]}> <Input value={form.contact} onChange={e => handleChange('contact', e.target.value)} maxLength={50} /> </Form.Item>
        <Form.Item label={t('common.country')} required>
          <div style={{ display: 'flex', gap: 8 }}>
            <Form.Item name="countryCode" rules={[{ required: true, message: t('common.country') + t('common.required') }]} noStyle>
              <Select showSearch optionFilterProp="children" placeholder={t('common.country')} style={{ width: 160 }} value={form.countryCode} onChange={handleCountryChange}>
                {countryCodeOptions.map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="cityCode" rules={[{ required: true, message: t('common.city') + t('common.required') }]} noStyle>
              <Select showSearch optionFilterProp="children" placeholder={t('common.city')} disabled={cityOptions.length === 0} style={{ width: 'calc(100% - 168px)' }} value={form.cityCode} onChange={value => handleChange('cityCode', value)}>
                {cityOptions.map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label={t('supplier.currency')} name="currency"> <Input value={form.currency} onChange={e => handleChange('currency', e.target.value)} maxLength={10} /> </Form.Item>
        <Form.Item label={t('supplier.logo')} name="logoId">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {form.logoId ? (
              <img src={getImage(form.logoId)} alt="logo" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 8, border: '1px solid #eee' }} />
            ) : null}
            <Button type="primary" onClick={() => document.getElementById('logo-upload-input')?.click()} loading={uploading}>{t('supplier.upload')}</Button>
            <input id="logo-upload-input" type="file" accept="image/*" hidden onChange={handleFileChange} />
            {uploadError && <span style={{ color: 'red', fontSize: 13 }}>{uploadError}</span>}
          </div>
        </Form.Item>
        <Form.Item name="enable" valuePropName="checked">
          <Checkbox checked={!!form.enable} onChange={e => handleChange('enable', e.target.checked)}>{t('supplier.enable')}</Checkbox>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>{t('common.cancel')}</Button>
          <Button type="primary" htmlType="submit">{initialValues ? t('common.update') : t('common.confirm')}</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierFormDialog;
