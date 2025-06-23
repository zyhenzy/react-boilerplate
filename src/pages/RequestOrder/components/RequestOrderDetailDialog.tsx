import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import type { RequestOrder } from '../../../api/request-order/types';
import { useTranslation } from 'react-i18next';

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
          <Typography variant="subtitle2" color="textSecondary">{t('requestOrder.phoneNumber', '手机号')}</Typography>
          <Typography>{order?.phoneNumber || '-'}</Typography>
        </Box>
        {/* 可根据 RequestOrder 字段继续补充展示 */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('close', '关闭')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestOrderDetailDialog;

