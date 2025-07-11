import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Checkbox } from 'antd';
import type { Customer } from '../../../api/customer/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

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
  const countryOptions = useSelector((state: RootState) => state.options.countryOptions);
  const [antdForm] = Form.useForm();

  useEffect(() => {
    if (form.enable === undefined) {
      setForm(f => ({ ...f, enable: true }));
    }
    if (open) {
      antdForm.setFieldsValue(form);
    } else {
      antdForm.resetFields();
    }
  }, [form, setForm, open, antdForm]);

  return (
    <Modal open={open} onCancel={onClose} footer={null} title={editingId ? t('customer.edit') : t('customer.add')} destroyOnClose>
      <Form
        form={antdForm}
        layout="vertical"
        initialValues={form}
        onFinish={onSubmit}
      >
        <Form.Item label={t('customer.name')} name="name" rules={[{ required: true, message: t('customer.name') + t('common.required') }]}>
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item label={t('customer.contact')} name="contact" rules={[{ required: true, message: t('customer.contact') + t('common.required') }]}>
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item label={t('customer.countryCode')} name="countryCode" rules={[{ required: true, message: t('customer.countryCode') + t('common.required') }]}>
          <Select showSearch allowClear placeholder={t('customer.countryCode')}>
            {countryOptions.map(option => (
              <Select.Option key={option.value} value={option.value}>{option.label}（{option.value}）</Select.Option>
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
