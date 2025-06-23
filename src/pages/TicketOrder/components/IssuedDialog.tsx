import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { IssuedTicketOrderCommand } from '../../../api/ticket-order/types';

interface IssuedDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: IssuedTicketOrderCommand) => void;
  loading?: boolean;
  orderId?: string;
}

const IssuedDialog: React.FC<IssuedDialogProps> = ({ open, onClose, onSubmit, loading, orderId }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<IssuedTicketOrderCommand>({ id: orderId || '' });

  useEffect(() => {
    setForm({ id: orderId || '' });
  }, [orderId, open]);

  const handleChange = (key: keyof IssuedTicketOrderCommand, value: any) => {
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
        <DialogTitle>{t('ticketOrder.issued')}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={t('ticketOrder.currencyPay')}
            fullWidth
            value={form.currency || ''}
            onChange={e => handleChange('currency', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel')}</Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>{t('ok')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default IssuedDialog;

