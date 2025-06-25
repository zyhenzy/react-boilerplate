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
            <InfoRow label={t('requestOrder.dep')} value={order?.dep} />
            <InfoRow label={t('requestOrder.arr')} value={order?.arr} />
            <InfoRow label={t('requestOrder.countryNumber')} value={order?.countryNumber} />
            <InfoRow label={t('requestOrder.phoneNumber')} value={order?.phoneNumber} />
            <InfoRow
                label={t('requestOrder.status')}
                value={typeof order?.status === 'number' ? t(`requestOrder.status_${order.status}`) : '-'}
            />
            <InfoRow label={t('requestOrder.remark')} value={order?.remark} />
            <InfoRow label={t('common.createdAt')} value={order?.createdAt} />
            <InfoRow label={t('common.updatedAt')} value={order?.updatedAt} />
          </Box>

          {order?.passengerList && order?.passengerList?.length > 0 && (
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  {t('requestOrder.passengerList')}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {order.passengerList.map((p, idx) => (
                    <Paper key={idx} variant="outlined" sx={{ p: 2, mb: 2 }}>
                      <Box display="grid" gap={1}>
                        <InfoRow label={t('requestOrder.passengerName')} value={p.name} />
                        <InfoRow label={t('requestOrder.englishName', '英文名')} value={p.englishName} />
                        <InfoRow label={t('requestOrder.birthday', '出生日期')} value={p.birthday} />
                        <InfoRow label={t('requestOrder.certificateType', '证件类型')} value={p.certificateType} />
                        <InfoRow label={t('requestOrder.certificateNo', '证件号')} value={p.certificateNo} />
                        <InfoRow label={t('requestOrder.nationality', '国籍')} value={p.nationality} />
                        <InfoRow label={t('requestOrder.countryNumber', '国家区号')} value={p.countryNumber} />
                        <InfoRow label={t('requestOrder.phoneNumber', '手机号')} value={p.phoneNumber} />
                        <InfoRow label={t('requestOrder.ticketNo', '票号')} value={p.ticketNo} />
                      </Box>
                    </Paper>
                ))}
              </Box>
          )}

          {order?.imageList && order.imageList.length > 0 && (
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  {t('requestOrder.imageList', '图片列表')}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {order.imageList.map((imgId, idx) => (
                      <img
                          key={idx}
                          src={getImage(imgId)}
                          alt="order-img"
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                            borderRadius: 8,
                            border: '1px solid #ddd'
                          }}
                      />
                  ))}
                </Box>
              </Box>
          )}
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
