import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import type { RequestOrder } from '../../../api/request-order/types';
import { useTranslation } from 'react-i18next';
import { getImage } from '../../../api/basic';

interface RequestOrderDetailDialogProps {
  open: boolean;
  onClose: () => void;
  order: RequestOrder | null;
}

const RequestOrderDetailDialog: React.FC<RequestOrderDetailDialogProps> = ({ open, onClose, order }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('requestOrder.detail', '需求订单详情')}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.dep', '出发地')}</Typography>
          <Typography>{order?.dep || '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.arr', '目的地')}</Typography>
          <Typography>{order?.arr || '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.countryNumber', '国家区号')}</Typography>
          <Typography>{order?.countryNumber || '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.phoneNumber', '手机号')}</Typography>
          <Typography>{order?.phoneNumber || '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.status', '状态')}</Typography>
          <Typography>{typeof order?.status === 'number' ? t(`requestOrder.status_${order.status}`) : '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.remark', '备注')}</Typography>
          <Typography>{order?.remark || '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.createdAt', '创建时间')}</Typography>
          <Typography>{order?.createdAt || '-'}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.updatedAt', '更新时间')}</Typography>
          <Typography>{order?.updatedAt || '-'}</Typography>
        </Box>
        {order?.passengerList && order.passengerList.length > 0 && (
          <Box mb={2}>
            <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.passengerList', '乘客列表')}</Typography>
            {order.passengerList.map((p, idx) => (
              <Box key={idx} ml={2} mb={1}>
                <Typography>{t('requestOrder.passengerName', '姓名')}: {p.name || '-'}</Typography>
                <Typography>{t('requestOrder.englishName', '英文名')}: {p.englishName || '-'}</Typography>
                <Typography>{t('requestOrder.birthday', '出生日期')}: {p.birthday || '-'}</Typography>
                <Typography>{t('requestOrder.certificateType', '证件类型')}: {p.certificateType || '-'}</Typography>
                <Typography>{t('requestOrder.certificateNo', '证件号')}: {p.certificateNo || '-'}</Typography>
                <Typography>{t('requestOrder.nationality', '国籍')}: {p.nationality || '-'}</Typography>
                <Typography>{t('requestOrder.countryNumber', '国家区号')}: {p.countryNumber || '-'}</Typography>
                <Typography>{t('requestOrder.phoneNumber', '手机号')}: {p.phoneNumber || '-'}</Typography>
                <Typography>{t('requestOrder.ticketNo', '票号')}: {p.ticketNo || '-'}</Typography>
              </Box>
            ))}
          </Box>
        )}
        {order?.imageList && order.imageList.length > 0 && (
          <Box mb={2}>
            <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.imageList', '图片列表')}</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {order.imageList.map((imgId, idx) => (
                <img key={idx} src={getImage(imgId)} alt="order-img" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('close', '关闭')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestOrderDetailDialog;
