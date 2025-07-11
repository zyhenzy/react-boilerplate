import React, { useEffect } from 'react';
import { Modal, Form, Input, Checkbox, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { sexOptions } from '../../../constants/sexOptions';
import {userTypeOptions} from "../../../constants/userTypeOptions";
const { Option } = Select;

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  editingId: string | null;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({ open, onClose, onSubmit, form, setForm, editingId }) => {
  const { t } = useTranslation();
  const [formInstance] = Form.useForm();
  const countryOptions = useSelector((state: RootState) => state.options.countryOptions);
  const roleOptions = useSelector((state: RootState) => state.options.roleOptions);
  const agentOptions = useSelector((state: RootState) => state.options.agentOptions);
  const customerOptions = useSelector((state: RootState) => state.options.customerOptions);
  const sexOpts = sexOptions.map(opt => ({ ...opt, label: t(`user.sex_${opt.value.toLowerCase()}`, opt.label) }));

  useEffect(() => {
    formInstance.setFieldsValue(form);
  }, [form, formInstance]);

  const handleUserTypeChange = (value:any)=>{
    setForm((f: any) => ({
      ...f,
      userType: value,
      agentId:undefined,
      customerId: undefined,
    }))
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={editingId ? t('update', '更新') : t('add', '新增')}
    >
      <Form
        form={formInstance}
        onFinish={values => {
          setForm((f: any) => ({ ...f, ...values }));
          onSubmit({ ...form, ...values });
        }}
        initialValues={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label={t('user.userType')} name="userType">
          <Select onChange={handleUserTypeChange}>
            {userTypeOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t('user.userName')} name="userName" rules={[{ required: true, message: t('user.userName') + t('common.required') }]}>
          <Input autoFocus />
        </Form.Item>
        <Form.Item label={t('user.name')} name="name" rules={[{ required: true, message: t('user.name') + t('common.required') }]}>
          <Input />
        </Form.Item>
        <Form.Item label={t('user.phoneNumber')} required>
          <Input.Group compact>
            <Form.Item name="countryNumber" noStyle>
              <Select showSearch optionFilterProp="children" placeholder={t('user.countryNumber')} style={{ width: 120 }}>
                {countryOptions.map((option: any) => (
                  <Option key={option.value} value={option.value}>({option.value}){option.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="phoneNumber" noStyle>
              <Input style={{ width: 'calc(100% - 120px)' }} placeholder={t('user.phoneNumber') as string} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label={t('user.email')} name="email">
          <Input />
        </Form.Item>
        <Form.Item label={t('user.sex')} name="sex">
          <Select>
            {sexOpts.map(option => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t('user.role')} name="role">
          <Select mode="multiple">
            {roleOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
        {form.userType === '1' && <Form.Item label={t('user.agent')} name="agentId">
          <Select>
            {agentOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>}
        {form.userType === '0' && <Form.Item label={t('user.customer')} name="customerId">
          <Select>
            {customerOptions.map((option: any) => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
          </Select>
        </Form.Item>}
        {editingId ? null : (
          <Form.Item label={t('user.password')} name="password" rules={[{ required: true, message: t('user.password') + t('common.required') }]}>
            <Input.Password />
          </Form.Item>
        )}
        <Form.Item name="enable" valuePropName="checked">
          <Checkbox>{t('user.enable')}</Checkbox>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>{t('cancel', '取消')}</Button>
          <Button type="primary" htmlType="submit">{editingId ? t('update', '更新') : t('add', '新增')}</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormDialog;
