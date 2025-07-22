import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import type { AddRequestOrderPassengerCommand } from '../../../api/request-order/types';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface PassengerListProps {
  passengerList: AddRequestOrderPassengerCommand[];
  onChange: (list: AddRequestOrderPassengerCommand[]) => void;
  countryOptions: { label: string; value: string }[];
}

const emptyPassenger: AddRequestOrderPassengerCommand = {
  name: '',
  englishName: '',
  birthday: '',
  certificateType: '',
  certificateNo: '',
  nationality: '',
  countryNumber: '',
  phoneNumber: '',
  ticketNo: '',
};

const PassengerList: React.FC<PassengerListProps> = ({ passengerList, onChange, countryOptions }) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<AddRequestOrderPassengerCommand>(emptyPassenger);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setForm(passengerList[index]);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingIndex(null);
    setForm(emptyPassenger);
    setDialogOpen(true);
  };

  const handleDelete = (index: number) => {
    const list = [...passengerList];
    list.splice(index, 1);
    onChange(list);
  };

  const handleDialogSubmit = () => {
    const list = [...passengerList];
    if (editingIndex === null) {
      list.push(form);
    } else {
      list[editingIndex] = form;
    }
    onChange(list);
    setDialogOpen(false);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span>{t('requestOrder.passengerList')}</span>
        <Button size="small" startIcon={<AddIcon />} onClick={handleAdd}>{t('add')}</Button>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('requestOrder.passengerName')}</TableCell>
            <TableCell>{t('requestOrder.passengerEnglishName')}</TableCell>
            <TableCell>{t('requestOrder.passengerCertificateType')}</TableCell>
            <TableCell>{t('requestOrder.passengerCertificateNo')}</TableCell>
            <TableCell>{t('requestOrder.passengerBirthday')}</TableCell>
            <TableCell>{t('requestOrder.passengerNationality')}</TableCell>
            <TableCell>{t('requestOrder.passengerPhoneNumber')}</TableCell>
            <TableCell>{t('requestOrder.passengerTicketNo')}</TableCell>
            <TableCell>{t('requestOrder.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengerList.length === 0 ? (
            <TableRow><TableCell colSpan={9}>{t('requestOrder.noData')}</TableCell></TableRow>
          ) : passengerList.map((p, idx) => (
            <TableRow key={idx}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.englishName}</TableCell>
              <TableCell>{p.certificateType}</TableCell>
              <TableCell>{p.certificateNo}</TableCell>
              <TableCell>{p.birthday}</TableCell>
              <TableCell>{p.nationality}</TableCell>
              <TableCell>{p.phoneNumber}</TableCell>
              <TableCell>{p.ticketNo}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => handleEdit(idx)}><EditIcon /></IconButton>
                <IconButton size="small" onClick={() => handleDelete(idx)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editingIndex === null ? t('add') : t('edit')}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={t('requestOrder.passengerName')}
            fullWidth
            value={form.name || ''}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <TextField
            margin="dense"
            label={t('requestOrder.passengerEnglishName')}
            fullWidth
            value={form.englishName || ''}
            onChange={e => setForm(f => ({ ...f, englishName: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('requestOrder.passengerCertificateType')}
            fullWidth
            value={form.certificateType || ''}
            onChange={e => setForm(f => ({ ...f, certificateType: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('requestOrder.passengerCertificateNo')}
            fullWidth
            value={form.certificateNo || ''}
            onChange={e => setForm(f => ({ ...f, certificateNo: e.target.value }))}
          />
          <DatePicker
              label={t('requestOrder.passengerBirthday')}
              value={form.birthday ? dayjs(form.birthday) : null}
              onChange={value => setForm(f => ({ ...f, birthday: value ? dayjs(value).format('YYYY-MM-DD') : '' }))}
              openTo="year"
              views={['year', 'month', 'day']}
              slotProps={{ textField: { fullWidth: true, margin: 'dense',size:'small' } }}
          />
          <TextField
            margin="dense"
            label={t('requestOrder.passengerNationality')}
            fullWidth
            value={form.nationality || ''}
            onChange={e => setForm(f => ({ ...f, nationality: e.target.value }))}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <TextField
              select
              margin="dense"
              label={t('requestOrder.countryNumber')}
              style={{ width: 120 }}
              value={form.countryNumber || ''}
              onChange={e => setForm(f => ({ ...f, countryNumber: e.target.value }))}
            >
              {countryOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label={t('requestOrder.passengerPhoneNumber')}
              fullWidth
              value={form.phoneNumber || ''}
              onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
            />
          </div>
          <TextField
            margin="dense"
            label={t('requestOrder.passengerTicketNo')}
            fullWidth
            value={form.ticketNo || ''}
            onChange={e => setForm(f => ({ ...f, ticketNo: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">{t('cancel')}</Button>
          <Button onClick={handleDialogSubmit} variant="contained" color="primary">{t('ok')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PassengerList;
