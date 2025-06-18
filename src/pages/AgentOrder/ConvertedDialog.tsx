import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConvertedAgentOrderCommand } from '../../api/agent-order/types';


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
      <DialogTitle>{t('agentOrder.converted', '转换成功')}</DialogTitle>
      <DialogContent>
        {/* 订单详情部分（只读，非表单） */}
        <div style={{marginBottom: 16, padding: 12, background: '#fafafa', borderRadius: 4, border: '1px solid #eee'}}>
          <div><b>{t('agentOrder.orderNo', '订单号')}：</b>{order?.orderNo || '-'}</div>
          <div><b>{t('agentOrder.type', '订单类型')}：</b>{typeof order?.type === 'number' ? t(`agentOrder.type${order.type}`) : '-'}</div>
          <div><b>{t('agentOrder.status', '订单状态')}：</b>{typeof order?.status === 'number' ? t(`agentOrder.status${order.status}`) : '-'}</div>
          <div><b>{t('agentOrder.price', '票面价')}：</b>{order?.price ?? '-'}</div>
          <div><b>{t('agentOrder.tax', '税费')}：</b>{order?.tax ?? '-'}</div>
          <div><b>{t('agentOrder.serviceCharge', '服务费')}：</b>{order?.serviceCharge ?? '-'}</div>
          <div><b>{t('agentOrder.pnr', 'PNR')}：</b>{order?.pnr || '-'}</div>
          <div><b>{t('agentOrder.tcRemark', '出票备注')}：</b>{order?.tcRemark || '-'}</div>
        </div>
        {/* 转换表单部分 */}
        <TextField margin="dense" label={t('agentOrder.pnr', 'PNR')} fullWidth value={form.pnr} onChange={e => handleChange('pnr', e.target.value)} />
        <TextField margin="dense" label={t('agentOrder.price', '票面价')} type="number" fullWidth value={form.price} onChange={e => handleChange('price', Number(e.target.value))} />
        <TextField margin="dense" label={t('agentOrder.tax', '税费')} type="number" fullWidth value={form.tax} onChange={e => handleChange('tax', Number(e.target.value))} />
        <TextField margin="dense" label={t('agentOrder.serviceCharge', '服务费')} type="number" fullWidth value={form.serviceCharge} onChange={e => handleChange('serviceCharge', Number(e.target.value))} />
        <TextField
          margin="dense"
          label={t('agentOrder.issuanceTimeLimit', '出票时限')}
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.issuanceTimeLimit || ''}
          onChange={e => handleChange('issuanceTimeLimit', e.target.value)}
        />
        <TextField margin="dense" label={t('agentOrder.tcRemark', '出票备注')} fullWidth value={form.tcRemark} onChange={e => handleChange('tcRemark', e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel', '取消')}</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">{t('confirm', '确定')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConvertedDialog;
