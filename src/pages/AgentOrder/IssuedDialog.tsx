import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
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

  const handleSubmit = () => {
    if (!order) return;
    onSubmit({
      pnr: order.pnr || '',
      price: order.price || 0,
      tax: order.tax || 0,
      serviceCharge: order.serviceCharge || 0,
      tcRemark: order.tcRemark || ''
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('agentOrder.issued', '出票')}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('agentOrder.pnr', 'PNR')}</Typography>
          <Typography>{order?.pnr || '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('agentOrder.price', '票面价')}</Typography>
          <Typography>{order?.price ?? '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('agentOrder.tax', '税费')}</Typography>
          <Typography>{order?.tax ?? '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('agentOrder.serviceCharge', '服务费')}</Typography>
          <Typography>{order?.serviceCharge ?? '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('agentOrder.tcRemark', '出票备注')}</Typography>
          <Typography>{order?.tcRemark || '-'}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel', '取消')}</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">{t('confirm', '确定')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssuedDialog;
