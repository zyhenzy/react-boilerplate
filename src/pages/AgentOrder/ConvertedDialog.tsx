import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConvertedAgentOrderCommand } from '../../api/agent-order/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface ConvertedDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: ConvertedAgentOrderCommand) => void;
  order?: any; // 传递完整订单对象
}

const ConvertedDialog: React.FC<ConvertedDialogProps> = ({ open, onClose, onSubmit, order }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<ConvertedAgentOrderCommand>({
    id: order?.id || '',
    pnr: order?.pnr || '',
    price: order?.price || 0,
    tax: order?.tax || 0,
    serviceCharge: order?.serviceCharge || 0,
    issuanceTimeLimit: '',
    tcRemark: order?.tcRemark || '',
  });

  React.useEffect(() => {
    setForm({
      id: order?.id || '',
      pnr: order?.pnr || '',
      price: order?.price || 0,
      tax: order?.tax || 0,
      serviceCharge: order?.serviceCharge || 0,
      issuanceTimeLimit: '',
      tcRemark: order?.tcRemark || '',
    });
  }, [order]);

  const handleSubmit = () => {
    onSubmit(form);
  };

  const handleChange = (key: keyof ConvertedAgentOrderCommand, value: any) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  const handleClose = () => {
    setForm({
      id: order?.id || '',
      pnr: order?.pnr || '',
      price: order?.price || 0,
      tax: order?.tax || 0,
      serviceCharge: order?.serviceCharge || 0,
      issuanceTimeLimit: '',
      tcRemark: order?.tcRemark || '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('agentOrder.converted')}</DialogTitle>
      <DialogContent>
        {/* 订单详情部分（只读，非表单） */}
        <div style={{marginBottom: 16, padding: 12, background: '#fafafa', borderRadius: 4, border: '1px solid #eee'}}>
          <div><b>{t('agentOrder.orderNo')}：</b>{order?.orderNo || '-'}</div>
          <div><b>{t('agentOrder.type')}：</b>{typeof order?.type === 'number' ? t(`agentOrder.type${order.type}`) : '-'}</div>
          <div><b>{t('agentOrder.status')}：</b>{typeof order?.status === 'number' ? t(`agentOrder.status${order.status}`) : '-'}</div>
          <div><b>{t('agentOrder.price')}：</b>{order?.price ?? '-'}</div>
          <div><b>{t('agentOrder.tax')}：</b>{order?.tax ?? '-'}</div>
          <div><b>{t('agentOrder.serviceCharge')}：</b>{order?.serviceCharge ?? '-'}</div>
          <div><b>{t('agentOrder.pnr')}：</b>{order?.pnr || '-'}</div>
          <div><b>{t('agentOrder.tcRemark')}：</b>{order?.agentRemark || '-'}</div>
        </div>
        {/* 转换表单部分 */}
        <TextField margin="dense" label={t('agentOrder.price')} type="number" fullWidth value={form.price} onChange={e => handleChange('price', Number(e.target.value))} />
        <TextField margin="dense" label={t('agentOrder.tax')} type="number" fullWidth value={form.tax} onChange={e => handleChange('tax', Number(e.target.value))} />
        <TextField margin="dense" label={t('agentOrder.serviceCharge')} type="number" fullWidth value={form.serviceCharge} onChange={e => handleChange('serviceCharge', Number(e.target.value))} />
        <DatePicker
            label={t('agentOrder.issuanceTimeLimit')}
            value={form.issuanceTimeLimit ? dayjs(form.issuanceTimeLimit) : null}
            onChange={value => handleChange('issuanceTimeLimit', value ? dayjs(value).format('YYYY-MM-DD') : '')}
            openTo="year"
            views={['year', 'month', 'day']}
            slotProps={{ textField: { fullWidth: true, margin: 'dense',size:'small' } }}
        />
        <TextField margin="dense" label={t('agentOrder.tcRemark')} fullWidth value={form.tcRemark} onChange={e => handleChange('tcRemark', e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">{t('confirm')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConvertedDialog;
