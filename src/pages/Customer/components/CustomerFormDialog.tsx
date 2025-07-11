import React, {useEffect, useState} from 'react';
import { Modal, Form, Input, Select, Button, Checkbox } from 'antd';
import type { Customer } from '../../../api/customer/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type {IOption} from "../../../api/basic/types";
import {getCityOptions} from "../../../api/basic";
import type {Supplier} from "../../../api/supplier/types";
import {serviceFeeCountTypeOptions} from "../../../constants/serviceFeeCountOptions";
const { Option } = Select;

interface CustomerFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<Customer>) => void;
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
  const productOptions = useSelector((state: any) => state.options.productOptions) || [];
  const [cityOptions,setCityOptions] = useState<any[]>([])
  const [antdForm] = Form.useForm();
  const [formInstance] = Form.useForm();

  useEffect(() => {
    if (form.enable === undefined) {
      setForm(f => ({ ...f, enable: true }));
    }
    if (open) {
      antdForm.setFieldsValue(form);
    } else {
      antdForm.resetFields();
      setForm({}); // 关闭弹窗时清空表单数据
    }
  }, [form.enable, setForm, open, antdForm]);

  const handleCountryChange = (value: string) => {
    setCityOptions([]);
    setForm(f => ({ ...f, country: value, cityCode: undefined }));
    formInstance.setFieldsValue({ cityCode: undefined });
    if (value) {
      getCityOptions(value).then(res => setCityOptions(res));
    }
  };

  const handleChange = (key: keyof Supplier, value: any) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title={editingId ? t('customer.edit') : t('customer.add')}>
      <Form
        form={antdForm}
        onFinish={values => {
          setForm((f: any) => ({ ...f, ...values }));
          onSubmit({ ...form, ...values });
        }}
        initialValues={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label={t('customer.name')} name="name" rules={[{ required: true, message: t('customer.name') + t('common.required') }]}>
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item label={t('customer.contact')} name="contact" rules={[{ required: true, message: t('customer.contact') + t('common.required') }]}>
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item label={t('common.country')} name="countryCode">
          <Select showSearch optionFilterProp="children" placeholder={t('common.country')} onChange={handleCountryChange} value={form.countryCode || undefined}>
            {countryCodeOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t('common.city')} name="cityCode">
          <Select showSearch optionFilterProp="children" placeholder={t('common.city')} disabled={cityOptions.length === 0} value={form.cityCode || undefined}>
            {cityOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t('customer.currency')} name="currency">
          <Input maxLength={10} />
        </Form.Item>
        <Form.Item label={t('customer.invoiceHeader')} name="invoiceHeader">
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item label={t('customer.invoiceTaxNumber')} name="invoiceTaxNumber">
          <Input maxLength={30} />
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
        <Form.Item label={t('customer.serviceFeeCountType')} name="serviceFeeCountType" rules={[{ required: true, message: t('customer.serviceFeeCountType') + t('common.required') }]}>
          <Select placeholder={t('customer.serviceFeeCountType')}>
            {serviceFeeCountTypeOptions.map(option => (
              <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t('customer.serviceFeeRatio')} name="serviceFeeRatio" rules={[{ required: true, message: t('customer.serviceFeeRatio') + t('common.required') }]}>
          <Input type="number" min={0} max={10} step={0.01} />
        </Form.Item>
        <Form.Item label={t('customer.enable')} name="enable" valuePropName="checked">
          <Checkbox>{t('customer.enable')}</Checkbox>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>{t('common.cancel')}</Button>
          <Button type="primary" htmlType="submit">{editingId ? t('common.update') : t('common.confirm')}</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerFormDialog;
