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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
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
        <DialogContent dividers sx={{ p: 2 }}>
          <Box display="grid" gap={1}>
            <InfoRow label={t('requestOrder.countryNumber')} value={order?.countryNumber} />
            <InfoRow label={t('requestOrder.phoneNumber')} value={order?.phoneNumber} />
            <InfoRow label={t('requestOrder.bookerName')} value={order?.bookerName} />
            <InfoRow label={t('requestOrder.remark')} value={order?.remark} />
            <InfoRow label={t('requestOrder.customer')} value={order?.customerId} />
            <InfoRow label={t('requestOrder.status')} value={typeof order?.status === 'number' ? t(`requestOrder.status_${order.status}`) : '-'} />
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{t('requestOrder.tripList')}</Typography>
            {order?.tripList?.length ? (
              <TableContainer component={Paper} sx={{ mb: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('requestOrder.dep')}</TableCell>
                      <TableCell>{t('requestOrder.arr')}</TableCell>
                      <TableCell>{t('requestOrder.startTime')}</TableCell>
                      <TableCell>{t('requestOrder.endTime')}</TableCell>
                      <TableCell>{t('requestOrder.flightNo')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.tripList.map((trip, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{trip.dep || '-'}</TableCell>
                        <TableCell>{trip.arr || '-'}</TableCell>
                        <TableCell>{trip.startTime || '-'}</TableCell>
                        <TableCell>{trip.endTime || '-'}</TableCell>
                        <TableCell>{trip.flightNo || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : <Typography color="text.secondary">{t('requestOrder.noTrip')}</Typography>}
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{t('requestOrder.passengerList')}</Typography>
            {order?.passengerList?.length ? (
              <TableContainer component={Paper} sx={{ mb: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('requestOrder.passengerName')}</TableCell>
                      <TableCell>{t('requestOrder.englishName')}</TableCell>
                      <TableCell>{t('requestOrder.birthday')}</TableCell>
                      <TableCell>{t('requestOrder.certificateType')}</TableCell>
                      <TableCell>{t('requestOrder.certificateNo')}</TableCell>
                      <TableCell>{t('requestOrder.nationality')}</TableCell>
                      <TableCell>{t('requestOrder.countryNumber')}</TableCell>
                      <TableCell>{t('requestOrder.phoneNumber')}</TableCell>
                      <TableCell>{t('requestOrder.ticketNo')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.passengerList.map((p, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{p.name || '-'}</TableCell>
                        <TableCell>{p.englishName || '-'}</TableCell>
                        <TableCell>{p.birthday || '-'}</TableCell>
                        <TableCell>{p.certificateType || '-'}</TableCell>
                        <TableCell>{p.certificateNo || '-'}</TableCell>
                        <TableCell>{p.nationality || '-'}</TableCell>
                        <TableCell>{p.countryNumber || '-'}</TableCell>
                        <TableCell>{p.phoneNumber || '-'}</TableCell>
                        <TableCell>{p.ticketNo || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : <Typography color="text.secondary">{t('requestOrder.noPassenger')}</Typography>}
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{t('requestOrder.imageList')}</Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {order?.imageList?.length ? order.imageList.map((img, idx) => (
                <img key={idx} src={getImage(img)} alt="order-img" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }} />
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
