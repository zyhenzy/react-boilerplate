import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TicketOrder } from '../../../api/ticket-order/types';

interface TicketOrderDetailDialogProps {
  open: boolean;
  onClose: () => void;
  order?: TicketOrder | null;
}

const TicketOrderDetailDialog: React.FC<TicketOrderDetailDialogProps> = ({ open, onClose, order }) => {
  const { t } = useTranslation();
  if (!order) return null;
  return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t('common.detail')}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1">{t('ticketOrder.billNo')}: {order.billNo}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.bookerName')}: {order.bookerName}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.bookerContact')}: {order.bookerContact}</Typography>
          <Typography variant="subtitle1">PNR: {order.pnr}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.status')}: {t(`ticketOrder.status_${order.status}`)}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">{t('ticketOrder.passengerList')}:</Typography>
          {(order.passengerList || []).map((p, idx) => (
              <Typography key={idx} variant="body2" sx={{ ml: 2 }}>
                {p.name} {p.phoneNumber ? `(${p.phoneNumber})` : ''}
              </Typography>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">{t('ticketOrder.flightList')}:</Typography>
          {(order.flightList || []).map((f, idx) => (
              <Typography key={idx} variant="body2" sx={{ ml: 2 }}>
                {f.flight} {f.depCity} → {f.arrCity} {f.depDate} {f.depTime}
              </Typography>
          ))}
          {/* 可根据需要补充更多字段 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('common.close') || t('close')}</Button>
        </DialogActions>
      </Dialog>
  );
};

export default TicketOrderDetailDialog;

