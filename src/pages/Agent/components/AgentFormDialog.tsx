import React, {useEffect, useState} from 'react';
import { Modal, Form, Input, Button, Select, Checkbox } from 'antd';
import type { Agent } from '../../../api/agent/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type {IOption} from "../../../api/basic/types";
import {getCityOptions} from "../../../api/basic";
const { Option } = Select;

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

  const handleCountryChange = (value: string) => {
    setCityOptions([]);
    setForm(f => ({ ...f, country: value }));
    if (value) {
      getCityOptions(value).then(res => setCityOptions(res));
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => { setCityOptions([]); onClose(); }}
      footer={null}
      title={editingId ? t('agent.edit') : t('agent.add')}
      destroyOnClose
    >
      <Form
        onFinish={values => {
          setForm((f: any) => ({ ...f, ...values }));
          onSubmit({ ...form, ...values });
        }}
        initialValues={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label={t('agent.name')} name="name" rules={[{ required: true, message: t('agent.name') + t('common.required') }]}>
          <Input maxLength={50} autoFocus />
        </Form.Item>
        <Form.Item label={t('agent.countryCode')} name="countryCode">
          <Input.Group compact>
            <Select showSearch optionFilterProp="children" placeholder={t('agent.countryCode')} style={{ width: 160 }}>
              {countryOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}（{option.value}）</Option>
              ))}
            </Select>
            <Form.Item name="contact" noStyle rules={[{ required: true, message: t('agent.contact') + t('common.required') }]}>
              <Input maxLength={50} style={{ width: 'calc(100% - 160px)' }} placeholder={t('agent.contact') as string} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label={t('common.country')} name="country">
          <Input.Group compact>
            <Select showSearch optionFilterProp="children" placeholder={t('common.country')} style={{ width: 160 }} onChange={handleCountryChange} value={form.country || undefined}>
              {countryCodeOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
            <Form.Item name="cityCode" noStyle>
              <Select showSearch optionFilterProp="children" placeholder={t('common.city')} disabled={cityOptions.length === 0} value={form.cityCode || undefined} style={{ width: 'calc(100% - 160px)' }}>
                {cityOptions.map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label={t('agent.currency')} name="currency">
          <Input maxLength={3} />
        </Form.Item>
        <Form.Item label={t('agent.invoiceHeader')} name="invoiceHeader">
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item label={t('agent.invoiceTaxNumber')} name="invoiceTaxNumber">
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item name="enable" valuePropName="checked">
          <Checkbox>{t('agent.enable')}</Checkbox>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>{t('common.cancel')}</Button>
          <Button type="primary" htmlType="submit">{editingId ? t('common.update') : t('common.confirm')}</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AgentFormDialog;
