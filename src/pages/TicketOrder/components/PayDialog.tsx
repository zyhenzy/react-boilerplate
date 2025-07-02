import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { PayedTicketOrderCommand } from '../../../api/ticket-order/types';

interface PayDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PayedTicketOrderCommand) => void;
  loading?: boolean;
  orderId?: string;
}

const PayDialog: React.FC<PayDialogProps> = ({ open, onClose, onSubmit, loading, orderId }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<PayedTicketOrderCommand>({ id: orderId || '' });

  React.useEffect(() => {
    setForm({ id: orderId || '' });
  }, [orderId, open]);

  const handleChange = (key: keyof PayedTicketOrderCommand, value: any) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id) return;
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{t('ticketOrder.pay')}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={t('ticketOrder.currencyPay')}
            fullWidth
            value={form.currencyPay || ''}
            onChange={e => handleChange('currencyPay', e.target.value)}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.ratePay')}
            fullWidth
            type="number"
            value={form.ratePay || ''}
            onChange={e => handleChange('ratePay', e.target.value )}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.payType')}
            fullWidth
            value={form.payType || ''}
            onChange={e => handleChange('payType', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>{t('common.confirm')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PayDialog;

