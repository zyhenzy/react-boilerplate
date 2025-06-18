import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ReviewFailedDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string, tcRemark: string) => void;
}

const ReviewFailedDialog: React.FC<ReviewFailedDialogProps> = ({ open, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState('');
  const [tcRemark, setTcRemark] = useState('');

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason.trim(), tcRemark.trim());
      setReason('');
      setTcRemark('');
    }
  };

  const handleClose = () => {
    setReason('');
    setTcRemark('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('agentOrder.reviewFailed', '复核失败')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t('agentOrder.reason', '失败原因')}
          fullWidth
          value={reason}
          onChange={e => setReason(e.target.value)}
          multiline
          rows={3}
        />
        <TextField
          margin="dense"
          label={t('agentOrder.tcRemark', '出票备注')}
          fullWidth
          value={tcRemark}
          onChange={e => setTcRemark(e.target.value)}
          multiline
          rows={2}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel', '取消')}</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">{t('confirm', '确定')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewFailedDialog;
