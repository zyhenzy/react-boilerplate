import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import type { TicketOrder } from '../../../api/ticket-order/types';
import { useTranslation } from 'react-i18next';
import PassengerFormDialog from './PassengerFormDialog';
import TripFormDialog from './TripFormDialog';
import type { AddTicketOrderPassengerCommand, AddTicketOrderTripCommand } from '../../../api/ticket-order/types';
import type { Supplier } from '../../../api/supplier/types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

interface TicketOrderFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<TicketOrder>) => void;
  form: Partial<TicketOrder>;
  setForm: React.Dispatch<React.SetStateAction<Partial<TicketOrder>>>;
  editingId: string | null;
  suppliers: Supplier[];
}

const TicketOrderFormDialog: React.FC<TicketOrderFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId,
  suppliers
}) => {
  const { t } = useTranslation();
  const [passengerDialogOpen, setPassengerDialogOpen] = React.useState(false);
  const [editingPassenger, setEditingPassenger] = React.useState<AddTicketOrderPassengerCommand | undefined>(undefined);
  const [tripDialogOpen, setTripDialogOpen] = React.useState(false);
  const [editingTrip, setEditingTrip] = React.useState<AddTicketOrderTripCommand | undefined>(undefined);
  const customerOptions = useSelector((state: RootState) => state.options.customerOptions);

  const handleAddPassenger = () => {
    setEditingPassenger(undefined);
    setPassengerDialogOpen(true);
  };

  const handleEditPassenger = (p: AddTicketOrderPassengerCommand, idx: number) => {
    setEditingPassenger({ ...p, _idx: idx } as any);
    setPassengerDialogOpen(true);
  };

  const handlePassengerSubmit = (values: AddTicketOrderPassengerCommand) => {
    setPassengerDialogOpen(false);
    setEditingPassenger(undefined);
    setForm(f => {
      const list = Array.isArray(f.passengerList) ? [...f.passengerList] : [];
      if ((values as any)._idx !== undefined) {
        // 编辑
        list[(values as any)._idx] = { ...values };
        delete (list[(values as any)._idx] as any)._idx;
      } else {
        // 新增
        list.push(values);
      }
      return { ...f, passengerList: list };
    });
  };

  const handleAddTrip = () => {
    setEditingTrip(undefined);
    setTripDialogOpen(true);
  };

  const handleEditTrip = (trip: AddTicketOrderTripCommand, idx: number) => {
    setEditingTrip({ ...trip, _idx: idx } as any);
    setTripDialogOpen(true);
  };

  const handleTripSubmit = (values: AddTicketOrderTripCommand) => {
    setTripDialogOpen(false);
    setEditingTrip(undefined);
    setForm(f => {
      const list = Array.isArray(f.flightList) ? [...f.flightList] : [];
      if ((values as any)._idx !== undefined) {
        // 编辑
        const { _idx, ...updateData } = values as any;
        list[_idx] = updateData;
      } else {
        // 新增
        list.push(values);
      }
      return { ...f, flightList: list };
    });
  };

  return (
      <Dialog open={open} onClose={onClose} fullScreen>
        <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <DialogTitle>{editingId ? t('ticketOrder.edit') : t('ticketOrder.add')}</DialogTitle>
          <DialogContent style={{ flex: 1, overflow: 'auto', maxHeight: 'calc(100vh - 52px)' }}>
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
            {/* 供应商下选择 */}

            <FormControl fullWidth margin="dense" required>
              <InputLabel>{t('ticketOrder.supplier')}</InputLabel>
              <Select
                  label={t('ticketOrder.supplier')}
                  value={form.supplierId || ''}
                  onChange={e => setForm(f => ({ ...f, supplierId: e.target.value }))}
              >
                {suppliers.map(s => (
                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {form.id&&<TextField
                margin="dense"
                label={t('ticketOrder.currencyBooking')}
                fullWidth
                value={form.currencyBooking || ''}
                onChange={e => setForm(f => ({ ...f, currencyBooking: e.target.value }))}
            />}
            {/* 客户下拉选择 */}
            <FormControl fullWidth margin="dense">
              <InputLabel>{t('ticketOrder.customerId', '客户')}</InputLabel>
              <Select
                label={t('ticketOrder.customerId', '客户')}
                value={form.customerId || ''}
                onChange={e => setForm(f => ({ ...f, customerId: e.target.value }))}
              >
                {customerOptions.map((c: any) => (
                  <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
            {/* 行程列表弹窗编辑版 */}
            <div style={{ margin: '16px 0' }}>
              <InputLabel>{t('ticketOrder.tripList') || t('ticketOrder.flightList')}</InputLabel>
              <ul style={{ paddingLeft: 16 }}>
                {(form.flightList || []).map((trip, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ flex: 1 }}>{trip.flight || t('ticketOrder.flight') + (idx + 1)}</span>
                      <Button size="small" onClick={() => handleEditTrip(trip, idx)}>{t('common.edit')}</Button>
                    </li>
                ))}
              </ul>
              <Button onClick={handleAddTrip} size="small">{t('ticketOrder.addFlight')}</Button>
            </div>
            {/* 乘客列表弹窗编辑版 */}
            <div style={{ margin: '16px 0' }}>
              <InputLabel>{t('ticketOrder.passengerList')}</InputLabel>
              <ul style={{ paddingLeft: 16 }}>
                {(form.passengerList || []).map((p, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ flex: 1 }}>{p.name || t('ticketOrder.passenger') + (idx + 1)}</span>
                      <Button size="small" onClick={() => handleEditPassenger(p, idx)}>{t('common.edit')}</Button>
                    </li>
                ))}
              </ul>
              <Button onClick={handleAddPassenger} size="small">{t('ticketOrder.addPassenger')}</Button>
            </div>
          </DialogContent>
          <DialogActions style={{ position: 'sticky', bottom: 0, background: '#fff', zIndex: 1 }}>
            <Button onClick={onClose}>{t('common.cancel')}</Button>
            <Button type="submit" variant="contained" color="primary">{t('common.confirm')}</Button>
          </DialogActions>
        </form>
        <PassengerFormDialog
            open={passengerDialogOpen}
            onClose={() => setPassengerDialogOpen(false)}
            onPassengerSubmit={handlePassengerSubmit}
            passenger={editingPassenger}
        />
        <TripFormDialog
            open={tripDialogOpen}
            onClose={() => setTripDialogOpen(false)}
            onTripSubmit={handleTripSubmit}
            trip={editingTrip}
        />
      </Dialog>
  );
};

export default TicketOrderFormDialog;
