import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { AgentOrder } from '../../api/agent-order/types';

interface IssuedDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (fields: { pnr: string; price: number; tax: number; serviceCharge: number; tcRemark: string }) => void;
  order: AgentOrder | null;
}

const IssuedDialog: React.FC<IssuedDialogProps> = ({ open, onClose, onSubmit, order }) => {
  const { t } = useTranslation();
  const [pnr, setPnr] = useState(order?.pnr || '');
  const [price, setPrice] = useState(order?.price || 0);
  const [tax, setTax] = useState(order?.tax || 0);
  const [serviceCharge, setServiceCharge] = useState(order?.serviceCharge || 0);
  const [tcRemark, setTcRemark] = useState(order?.tcRemark || '');

  useEffect(() => {
    setPnr(order?.pnr || '');
    setPrice(order?.price || 0);
    setTax(order?.tax || 0);
    setServiceCharge(order?.serviceCharge || 0);
    setTcRemark(order?.tcRemark || '');
  }, [order]);

  const handleSubmit = () => {
    onSubmit({ pnr, price, tax, serviceCharge, tcRemark });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('agentOrder.issued', '出票')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={t('agentOrder.pnr', 'PNR')}
          fullWidth
          value={pnr}
          onChange={e => setPnr(e.target.value)}
        />
        <TextField
          margin="dense"
          label={t('agentOrder.price', '票面价')}
          type="number"
          fullWidth
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />
        <TextField
          margin="dense"
          label={t('agentOrder.tax', '税费')}
          type="number"
          fullWidth
          value={tax}
          onChange={e => setTax(Number(e.target.value))}
        />
        <TextField
          margin="dense"
          label={t('agentOrder.serviceCharge', '服务费')}
          type="number"
          fullWidth
          value={serviceCharge}
          onChange={e => setServiceCharge(Number(e.target.value))}
        />
        <TextField
          margin="dense"
          label={t('agentOrder.tcRemark', '出票备注')}
          fullWidth
          value={tcRemark}
          onChange={e => setTcRemark(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel', '取消')}</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">{t('confirm', '确定')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssuedDialog;

