import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import type { Passenger } from '../../../api/passenger/types';
import { useTranslation } from 'react-i18next';

interface SelectPassengerDialogProps {
  open: boolean;
  onClose: () => void;
  passengerList: Passenger[];
  onConfirm: (selected: Passenger[]) => void;
}

const SelectPassengerDialog: React.FC<SelectPassengerDialogProps> = ({ open, onClose, passengerList, onConfirm }) => {
  const { t } = useTranslation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleConfirm = () => {
    const selected = passengerList.filter(p => p.id && selectedIds.includes(p.id));
    onConfirm(selected);
    setSelectedIds([]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{t('ticketOrder.selectPassenger')}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('ticketOrder.passengerName')}</TableCell>
                <TableCell>{t('ticketOrder.englishName')}</TableCell>
                <TableCell>{t('ticketOrder.birthday')}</TableCell>
                <TableCell>{t('ticketOrder.certificateType')}</TableCell>
                <TableCell>{t('ticketOrder.certificateNo')}</TableCell>
                <TableCell>{t('ticketOrder.nationality')}</TableCell>
                <TableCell>{t('ticketOrder.countryNumber')}</TableCell>
                <TableCell>{t('ticketOrder.phoneNumber')}</TableCell>
                <TableCell>{t('ticketOrder.sex')}</TableCell>
                <TableCell>{t('ticketOrder.validity')}</TableCell>
                <TableCell>{t('common.action')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {passengerList.map(p => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.englishName}</TableCell>
                  <TableCell>{p.birthday}</TableCell>
                  <TableCell>{p.certificateType}</TableCell>
                  <TableCell>{p.certificateNo}</TableCell>
                  <TableCell>{p.nationality}</TableCell>
                  <TableCell>{p.countryNumber}</TableCell>
                  <TableCell>{p.phoneNumber}</TableCell>
                  <TableCell>{p.sex}</TableCell>
                  <TableCell>{p.validity}</TableCell>
                  <TableCell>
                    <Checkbox checked={selectedIds.includes(p.id!)} onChange={() => handleToggle(p.id!)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">{t('common.confirm')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectPassengerDialog;
