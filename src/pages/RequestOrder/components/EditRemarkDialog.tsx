import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import type { RequestOrder } from '../../../api/request-order/types';
import { useTranslation } from 'react-i18next';

interface EditRemarkDialogProps {
  open: boolean;
  onClose: () => void;
  order: RequestOrder | null;
  onSubmit: (remark: string) => void;
}

const EditRemarkDialog: React.FC<EditRemarkDialogProps> = ({ open, onClose, order, onSubmit }) => {
  const { t } = useTranslation();
  const [remark, setRemark] = useState('');

  useEffect(() => {
    setRemark(order?.remark || '');
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(remark);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t('requestOrder.editRemark', '编辑备注')}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label={t('requestOrder.remark')}
              value={remark}
              onChange={e => setRemark(e.target.value)}
              fullWidth
              multiline
              minRows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('cancel', '取消')}</Button>
          <Button type="submit" variant="contained" color="primary">{t('save')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditRemarkDialog;

