import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  InputLabel
} from '@mui/material';
import type { TicketOrder } from '../../../api/ticket-order/types';
import { useTranslation } from 'react-i18next';

interface TicketOrderFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<TicketOrder>) => void;
  form: Partial<TicketOrder>;
  setForm: React.Dispatch<React.SetStateAction<Partial<TicketOrder>>>;
  editingId: string | null;
}

const TicketOrderFormDialog: React.FC<TicketOrderFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
        <DialogTitle>{editingId ? t('ticketOrder.edit') : t('ticketOrder.add')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('ticketOrder.bookerName')}
            fullWidth
            value={form.bookerName || ''}
            onChange={e => setForm(f => ({ ...f, bookerName: e.target.value }))}
            required
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.bookerContact')}
            fullWidth
            value={form.bookerContact || ''}
            onChange={e => setForm(f => ({ ...f, bookerContact: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.pnr')}
            fullWidth
            value={form.pnr || ''}
            onChange={e => setForm(f => ({ ...f, pnr: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.supplierId')}
            fullWidth
            value={form.supplierId || ''}
            onChange={e => setForm(f => ({ ...f, supplierId: e.target.value }))}
            required
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.rateBooking')}
            fullWidth
            type="number"
            value={form.rateBooking || ''}
            onChange={e => setForm(f => ({ ...f, rateBooking: Number(e.target.value) }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.changeRule')}
            fullWidth
            value={form.changeRule || ''}
            onChange={e => setForm(f => ({ ...f, changeRule: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.refundRule')}
            fullWidth
            value={form.refundRule || ''}
            onChange={e => setForm(f => ({ ...f, refundRule: e.target.value }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.originalTicketFee')}
            fullWidth
            type="number"
            value={form.originalTicketFee || ''}
            onChange={e => setForm(f => ({ ...f, originalTicketFee: Number(e.target.value) }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.ticketFee')}
            fullWidth
            type="number"
            value={form.ticketFee || ''}
            onChange={e => setForm(f => ({ ...f, ticketFee: Number(e.target.value) }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.taxFee')}
            fullWidth
            type="number"
            value={form.taxFee || ''}
            onChange={e => setForm(f => ({ ...f, taxFee: Number(e.target.value) }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.insuranceFee')}
            fullWidth
            type="number"
            value={form.insuranceFee || ''}
            onChange={e => setForm(f => ({ ...f, insuranceFee: Number(e.target.value) }))}
          />
          <TextField
            margin="dense"
            label={t('ticketOrder.serviceFee')}
            fullWidth
            type="number"
            value={form.serviceFee || ''}
            onChange={e => setForm(f => ({ ...f, serviceFee: Number(e.target.value) }))}
          />
          {/* 航班列表输入（简化版） */}
          <div style={{ margin: '16px 0' }}>
            <InputLabel>{t('ticketOrder.flightList')}</InputLabel>
            {(form.flightList || []).map((flight, idx) => (
              <TextField
                key={idx}
                margin="dense"
                label={t('ticketOrder.flight') + (idx + 1)}
                fullWidth
                value={flight.flight || ''}
                onChange={e => {
                  const newList = [...(form.flightList || [])];
                  newList[idx] = { ...newList[idx], flight: e.target.value };
                  setForm(f => ({ ...f, flightList: newList }));
                }}
              />
            ))}
            <Button onClick={() => setForm(f => ({
              ...(f || {}),
              flightList: Array.isArray(f?.flightList) ? [...f.flightList, {}] : [{}]
            }))} size="small">
              {t('ticketOrder.addFlight')}
            </Button>
          </div>
          {/* 乘客列表输入（简化版） */}
          <div style={{ margin: '16px 0' }}>
            <InputLabel>{t('ticketOrder.passengerList')}</InputLabel>
            {(form.passengerList || []).map((p, idx) => (
              <TextField
                key={idx}
                margin="dense"
                label={t('ticketOrder.passenger') + (idx + 1)}
                fullWidth
                value={p.name || ''}
                onChange={e => {
                  const newList = [...(form.passengerList || [])];
                  newList[idx] = { ...newList[idx], name: e.target.value };
                  setForm(f => ({ ...f, passengerList: newList }));
                }}
              />
            ))}
            <Button onClick={() => setForm(f => ({
              ...(f || {}),
              passengerList: Array.isArray(f?.passengerList) ? [...f.passengerList, {}] : [{}]
            }))} size="small">
              {t('ticketOrder.addPassenger')}
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">{t('cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">{editingId ? t('update') : t('add')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TicketOrderFormDialog;
