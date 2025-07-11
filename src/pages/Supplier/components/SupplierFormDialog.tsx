import React, { useState } from 'react';
import {Modal, Form, Input, Select, Button, Checkbox, Upload, message, Image, UploadFile, UploadProps} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Supplier } from '../../../api/supplier/types';
import { getCityOptions, getImage, uploadImage } from '../../../api/basic';
import { useSelector } from 'react-redux';
import type { IOption } from '../../../api/basic/types';
import {useTranslation} from "react-i18next";

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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const countryCodeOptions = useSelector((state: any) => state.options.countryCodeOptions) as IOption[];
  const productOptions = useSelector((state: any) => state.options.productOptions) || [];
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [formInstance] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(form.logoId ? [{
    uid: '-1',
    name: 'logo.png',
    status: 'done',
    url: getImage(form.logoId)
  }] : []);

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

  const handleCountryChange = (value: string) => {
    setCityOptions([]);
    setForm(f => ({ ...f, countryCode: value, cityCode: '' }));
    if (value) {
      getCityOptions(value).then(res => setCityOptions(res));
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as File);
      await new Promise(resolve => reader.onload = resolve);
      file.preview = reader.result as string;
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length && newFileList[0].status === 'done' && newFileList[0].response) {
      setForm(f => ({ ...f, logoId: newFileList[0].response.imageId }));
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title={initialValues ? t('supplier.edit') : t('supplier.add')}>
      <Form
        form={formInstance}
        initialValues={form}
        onFinish={values => {
          setForm((f: any) => ({ ...f, ...values }));
          onSubmit({ ...form, ...values });
        }}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label={t('supplier.name')} name="name" rules={[{ required: true, message: t('supplier.name') + t('common.required') }]}>
          <Input value={form.name} maxLength={50} />
        </Form.Item>
        <Form.Item label={t('supplier.contact')} name="contact" rules={[{ required: true, message: t('supplier.contact') + t('common.required') }]}>
          <Input value={form.contact} maxLength={50} />
        </Form.Item>
        {/* 国家 */}
        <Form.Item label={t('common.country')} name="countryCode" rules={[{ required: true, message: t('common.country') + t('common.required') }]}>
          <Select showSearch optionFilterProp="children" placeholder={t('common.country')} style={{ width: 160 }} onChange={handleCountryChange}>
            {countryCodeOptions.map(option => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
        {/* 城市 */}
        <Form.Item label={t('common.city')} name="cityCode" rules={[{ required: true, message: t('common.city') + t('common.required') }]}>
          <Select showSearch optionFilterProp="children" placeholder={t('common.city')} disabled={cityOptions.length === 0}>
            {cityOptions.map(option => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t('supplier.currency')} name="currency">
          <Input value={form.currency} maxLength={10} />
        </Form.Item>
        <Form.Item label={t('supplier.bank')} name="bank">
          <Input value={form.bank} maxLength={50} />
        </Form.Item>
        <Form.Item label={t('supplier.bankAddress')} name="bankAddress">
          <Input value={form.bankAddress} maxLength={100} />
        </Form.Item>
        <Form.Item label={t('supplier.bankPostalCode')} name="bankPostalCode">
          <Input value={form.bankPostalCode} maxLength={20} />
        </Form.Item>
        <Form.Item label={t('supplier.bankSwiftCode')} name="bankSwiftCode">
          <Input value={form.bankSwiftCode} maxLength={20} />
        </Form.Item>
        <Form.Item label={t('supplier.bankAccount')} name="bankAccount">
          <Input value={form.bankAccount} maxLength={30} />
        </Form.Item>
        <Form.Item label={t('supplier.bankAccountName')} name="bankAccountName">
          <Input value={form.bankAccountName} maxLength={50} />
        </Form.Item>
        <Form.Item label={t('common.remark')} name="remark">
          <Input.TextArea value={form.remark} maxLength={200} rows={2} />
        </Form.Item>
        <Form.Item label={t('supplier.products')} name="products">
          <Select
            mode="tags"
            value={form.products}
            onChange={value => handleChange('products', value)}
            placeholder={t('supplier.products')}
            style={{ width: '100%' }}
          >
            {productOptions.map((option: any) => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t('supplier.upload')} name="logoId">
          <Upload
            name="file"
            listType="picture-card"
            fileList={fileList}
            showUploadList={{ showPreviewIcon: true }}
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                const formData = new FormData();
                formData.append('file', file);
                if (form.id) {
                  formData.append('id', String(form.id));
                }
                const imageId = await uploadImage(formData);
                console.log(imageId)
                setForm(f => ({ ...f, logoId: imageId }));
                setFileList([{ uid: '-1', name: 'logo.png', status: 'done', url: getImage(imageId) }]);
                onSuccess && onSuccess({ imageId });
                message.success(t('common.uploadSuccess'));
              } catch (err: any) {
                setUploadError(err?.message || '上传失败');
                onError && onError(err);
                message.error(t('common.uploadFail'));
              }
            }}
            accept="image/*"
            onPreview={handlePreview}
            onChange={handleUploadChange}
            style={{ width: 180, height: 180 }}
          >
            {fileList.length >= 1 ? null : (
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{t('supplier.upload')}</div>
              </button>
            )}
          </Upload>
          {uploadError && <span style={{ color: 'red', fontSize: 13 }}>{uploadError}</span>}
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
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
