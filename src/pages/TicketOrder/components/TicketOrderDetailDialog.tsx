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
          <Typography variant="subtitle1">{t('ticketOrder.rateBooking')}: {order.rateBooking}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.currencyBooking')}: {order.currencyBooking}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.changeRule')}: {order.changeRule}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.refundRule')}: {order.refundRule}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.originalTicketFee')}: {order.originalTicketFee}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.ticketFee')}: {order.ticketFee}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.taxFee')}: {order.taxFee}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.insuranceFee')}: {order.insuranceFee}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.serviceFee')}: {order.serviceFee}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">{t('ticketOrder.passengerList')}:</Typography>
          {(order.passengerList || []).map((p, idx) => (
              <Typography key={idx} variant="body2" sx={{ ml: 2 }}>
                {p.name} {p.englishName ? `(${p.englishName})` : ''} {p.phoneNumber ? `电话: ${p.phoneNumber}` : ''} {p.certificateType ? `证件类型: ${p.certificateType}` : ''} {p.certificateNo ? `证件号: ${p.certificateNo}` : ''} {p.nationality ? `国籍: ${p.nationality}` : ''} {p.ticketNo ? `票号: ${p.ticketNo}` : ''}
              </Typography>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">{t('ticketOrder.flightList')}:</Typography>
          {(order.flightList || []).map((f, idx) => (
              <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 1 }}>
                {f.airline ? `${t('ticketOrder.airline')}: ${f.airline} ` : ''}
                {f.flight ? `${t('ticketOrder.flight')}: ${f.flight} ` : ''}
                {f.depCity ? `${t('ticketOrder.depCity')}: ${f.depCity} ` : ''}
                {f.arrCity ? `${t('ticketOrder.arrCity')}: ${f.arrCity} ` : ''}
                {f.depAirport ? `${t('ticketOrder.depAirport')}: ${f.depAirport} ` : ''}
                {f.arrAirport ? `${t('ticketOrder.arrAirport')}: ${f.arrAirport} ` : ''}
                {f.depTerminal ? `${t('ticketOrder.depTerminal')}: ${f.depTerminal} ` : ''}
                {f.arrTerminal ? `${t('ticketOrder.arrTerminal')}: ${f.arrTerminal} ` : ''}
                {f.depDate ? `${t('ticketOrder.depDate')}: ${f.depDate} ` : ''}
                {f.depTime ? `${t('ticketOrder.depTime')}: ${f.depTime} ` : ''}
                {f.arrDate ? `${t('ticketOrder.arrDate')}: ${f.arrDate} ` : ''}
                {f.arrTime ? `${t('ticketOrder.arrTime')}: ${f.arrTime} ` : ''}
                {f.cabinLevel ? `${t('ticketOrder.cabinLevel')}: ${f.cabinLevel} ` : ''}
                {f.cabinCode ? `${t('ticketOrder.cabinCode')}: ${f.cabinCode} ` : ''}
                {f.planCabinCode ? `${t('ticketOrder.planCabinCode')}: ${f.planCabinCode} ` : ''}
                {f.flyingTime ? `${t('ticketOrder.flyingTime')}: ${f.flyingTime} ` : ''}
                {f.aircraft ? `${t('ticketOrder.aircraft')}: ${f.aircraft} ` : ''}
                {f.meals ? `${t('ticketOrder.meals')}: ${f.meals} ` : ''}
                {f.luggageTransportationRule ? `${t('ticketOrder.luggageTransportationRule')}: ${f.luggageTransportationRule} ` : ''}
                {f.luggageHandRule ? `${t('ticketOrder.luggageHandRule')}: ${f.luggageHandRule} ` : ''}
                {f.stop !== undefined ? `${t('ticketOrder.stop')}: ${f.stop ? t('common.yes') : t('common.no')} ` : ''}
                {f.remark ? `${t('ticketOrder.remark')}: ${f.remark} ` : ''}
                {f.price ? `${t('ticketOrder.price')}: ${f.price} ` : ''}
                {f.airportFee ? `${t('ticketOrder.airportFee')}: ${f.airportFee} ` : ''}
                {f.fuelFee ? `${t('ticketOrder.fuelFee')}: ${f.fuelFee} ` : ''}
              </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('common.close') || t('close')}</Button>
        </DialogActions>
      </Dialog>
  );
};

export default TicketOrderDetailDialog;
