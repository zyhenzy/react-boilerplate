import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
  Paper
} from '@mui/material';
import type { RequestOrder } from '../../../api/request-order/types';
import { useTranslation } from 'react-i18next';
import { getImage } from '../../../api/basic';

interface RequestOrderDetailDialogProps {
  open: boolean;
  onClose: () => void;
  order: RequestOrder | null;
}

const InfoRow: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
    <Box mb={1}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || '-'}</Typography>
    </Box>
);

const RequestOrderDetailDialog: React.FC<RequestOrderDetailDialogProps> = ({ open, onClose, order }) => {
  const { t } = useTranslation();

  return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {t('common.detail')}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Box display="grid" gap={2}>
            <InfoRow label={t('requestOrder.countryNumber')} value={order?.countryNumber} />
            <InfoRow label={t('requestOrder.phoneNumber')} value={order?.phoneNumber} />
            <InfoRow label={t('requestOrder.bookerName')} value={order?.bookerName} />
            <InfoRow label={t('requestOrder.remark')} value={order?.remark} />
            <InfoRow label={t('requestOrder.customer')} value={order?.customerId} />
            <InfoRow label={t('requestOrder.status')} value={typeof order?.status === 'number' ? t(`requestOrder.status_${order.status}`) : '-'} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{t('requestOrder.tripList')}</Typography>
            {order?.tripList?.length ? (
              order.tripList.map((trip, idx) => (
                <Paper key={idx} variant="outlined" sx={{ p: 1, mb: 1 }}>
                  <InfoRow label={t('requestOrder.dep')} value={trip.dep} />
                  <InfoRow label={t('requestOrder.arr')} value={trip.arr} />
                  <InfoRow label={t('requestOrder.startTime')} value={trip.startTime} />
                  <InfoRow label={t('requestOrder.endTime')} value={trip.endTime} />
                  <InfoRow label={t('requestOrder.flightNo')} value={trip.flightNo} />
                </Paper>
              ))
            ) : <Typography color="text.secondary">{t('requestOrder.noTrip')}</Typography>}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{t('requestOrder.passengerList')}</Typography>
            {order?.passengerList?.length ? (
              order.passengerList.map((p, idx) => (
                <Paper key={idx} variant="outlined" sx={{ p: 1, mb: 1 }}>
                  <InfoRow label={t('requestOrder.passengerName')} value={p.name} />
                  <InfoRow label={t('requestOrder.englishName')} value={p.englishName} />
                  <InfoRow label={t('requestOrder.birthday')} value={p.birthday} />
                  <InfoRow label={t('requestOrder.certificateType')} value={p.certificateType} />
                  <InfoRow label={t('requestOrder.certificateNo')} value={p.certificateNo} />
                  <InfoRow label={t('requestOrder.nationality')} value={p.nationality} />
                  <InfoRow label={t('requestOrder.countryNumber')} value={p.countryNumber} />
                  <InfoRow label={t('requestOrder.phoneNumber')} value={p.phoneNumber} />
                  <InfoRow label={t('requestOrder.ticketNo')} value={p.ticketNo} />
                </Paper>
              ))
            ) : <Typography color="text.secondary">{t('requestOrder.noPassenger')}</Typography>}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{t('requestOrder.imageList')}</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              {order?.imageList?.length ? order.imageList.map((img, idx) => (
                <img key={idx} src={getImage(img)} alt="order-img" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
              )) : <Typography color="text.secondary">{t('requestOrder.noImage')}</Typography>}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} variant="contained" color="primary">
            {t('close', '关闭')}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default RequestOrderDetailDialog;
