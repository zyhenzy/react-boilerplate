import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface PasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({ open, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
    setPassword('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{t('user.changePassword')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t('user.newPassword')}
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{t('common.confirm')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PasswordDialog;

