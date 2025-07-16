import React, {useEffect, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  TicketOrder,
  UpdateTicketOrderPassengerCommand,
  UpdateTicketOrderTripCommand
} from '../../../api/ticket-order/types';
import { useTranslation } from 'react-i18next';
import PassengerFormDialog from './PassengerFormDialog';
import TripFormDialog from './TripFormDialog';
import type { AddTicketOrderPassengerCommand, AddTicketOrderTripCommand } from '../../../api/ticket-order/types';
import type { Supplier } from '../../../api/supplier/types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import {
  addTicketOrderPassenger,
  addTicketOrderTrip,
  deleteTicketOrderPassenger,
  deleteTicketOrderTrip,
  updateTicketOrderPassenger,
  updateTicketOrderTrip
} from "../../../api/ticket-order";
import {Passenger, PassengerQuery} from "../../../api/passenger/types";
import {getPassengerListByCustomer} from "../../../api/passenger";
// import CloseIcon from '@mui/icons-material/Close';
import SelectPassengerDialog from './SelectPassengerDialog';

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
  suppliers
}) => {
  const { t } = useTranslation();
  const [passengerDialogOpen, setPassengerDialogOpen] = React.useState(false);
  const [editingPassenger, setEditingPassenger] = React.useState<AddTicketOrderPassengerCommand | undefined>(undefined);
  const [tripDialogOpen, setTripDialogOpen] = React.useState(false);
  const [editingTrip, setEditingTrip] = React.useState<AddTicketOrderTripCommand | undefined>(undefined);
  const [selectPassengerDialogOpen, setSelectPassengerDialogOpen] = useState(false);
  const customerOptions = useSelector((state: RootState) => state.options.customerOptions);
  const [currentCurrency,setCurrentCurrency] = useState<string>() // 当前币种，来源于客户
  const [passengerList,setPassengerList] = useState<Passenger[]>([]) // 客户历史乘客信息

  useEffect(() => {
    if(form.customerId){
      getCurrencyByCustomerId(form.customerId);
      getPassengerByCustomerId(form.customerId);
    }
  }, [form.customerId]);

  // 获取当前币种
  const getCurrencyByCustomerId = (customerId:string)=>{
    const customer = customerOptions.find(c => c.value === customerId);
    if(customer){
      setCurrentCurrency(customer.currency);
    }
  }

  // 获取历史乘客信息
  const getPassengerByCustomerId = async (customerId:string)=>{
    const params:PassengerQuery = {
      Id:customerId,
      PageIndex: 1,
      PageSize: 10000
    }
    const passengerList = await getPassengerListByCustomer(params)
    console.log(passengerList)
    debugger
    setPassengerList(passengerList.data || []);
  }

  const handleAddPassenger = () => {
    setEditingPassenger(undefined);
    setPassengerDialogOpen(true);
  };

  const handleEditPassenger = (p: AddTicketOrderPassengerCommand, idx: number) => {
    setEditingPassenger({ ...p, _idx: idx } as any);
    setPassengerDialogOpen(true);
  };

  const handleDeletePassenger = async (p: AddTicketOrderPassengerCommand, idx: number) => {
    // 如果是编辑订单，且有id，调用后端删除接口
    if (form.id && (p as UpdateTicketOrderPassengerCommand).id) {
      // 这里假设有deleteTicketOrderPassenger方法
      await deleteTicketOrderPassenger({ id: (p as UpdateTicketOrderPassengerCommand).id });
      // 你可以根据实际API调整参数
    }
    setForm(f => {
      const list = Array.isArray(f.passengerList) ? [...f.passengerList] : [];
      list.splice(idx, 1);
      return { ...f, passengerList: list };
    });
  }

  const handlePassengerSubmit = async (values: AddTicketOrderPassengerCommand|UpdateTicketOrderPassengerCommand) => {
    // 如果在修改订单中，新增或者修改乘客信息，调用接口
    if(form.id){
      if(editingPassenger){
        // 修改乘客信息
        await updateTicketOrderPassenger(values as UpdateTicketOrderPassengerCommand)
      }else{
        const params = values as AddTicketOrderPassengerCommand;
        params.ticketOrderId = form.id;
        // 新增乘客信息
        await addTicketOrderPassenger(params)
      }
    }
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

  const handleDeleteTrip=async (p: AddTicketOrderTripCommand, idx: number)=>{
    // 如果是编辑订单，且有id，调用后端删除接口
    if (form.id && (p as UpdateTicketOrderTripCommand).id) {
      await deleteTicketOrderTrip({ id: (p as UpdateTicketOrderPassengerCommand).id });
    }
    setForm(f => {
      const list = Array.isArray(f.flightList) ? [...f.flightList] : [];
      list.splice(idx, 1);
      return { ...f, flightList: list };
    });
  }

  const handleTripSubmit = async (values: AddTicketOrderTripCommand|UpdateTicketOrderTripCommand) => {
    // 如果在修改订单中，新增或者修改行程，调用接口
    if(form.id){
      if(editingTrip){
        // 修改行程
        await updateTicketOrderTrip(values as UpdateTicketOrderTripCommand)
      }else{
        const params = values as AddTicketOrderTripCommand;
        params.ticketOrderId = form.id;
        // 新增行程
        await addTicketOrderTrip(values as AddTicketOrderTripCommand)
      }
    }
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        {/*<DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>*/}
        {/*  {editingId ? t('ticketOrder.edit') : t('ticketOrder.add')}*/}
        {/*  <Button*/}
        {/*    aria-label="close"*/}
        {/*    onClick={onClose}*/}
        {/*    sx={{*/}
        {/*      position: 'absolute',*/}
        {/*      right: 8,*/}
        {/*      top: 8,*/}
        {/*      minWidth: 0,*/}
        {/*      padding: 0,*/}
        {/*      color: (theme) => theme.palette.grey[500],*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <CloseIcon />*/}
        {/*  </Button>*/}
        {/*</DialogTitle>*/}
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
              label={t('ticketOrder.adjustmentValue')}
              fullWidth
              type="number"
              value={form.adjustmentValue || ''}
              onChange={e => setForm(f => ({ ...f, adjustmentValue: e.target.value }))}
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
              onChange={e => setForm(f => ({ ...f, originalTicketFee: e.target.value }))}
              InputProps={{
                endAdornment: currentCurrency&&<span style={{ marginLeft: 4 }}>{currentCurrency}</span>
              }}
          />
          <TextField
              margin="dense"
              label={t('ticketOrder.ticketFee')}
              fullWidth
              type="number"
              value={form.ticketFee || ''}
              onChange={e => setForm(f => ({ ...f, ticketFee: e.target.value }))}
              InputProps={{
                endAdornment: currentCurrency&&<span style={{ marginLeft: 4 }}>{currentCurrency}</span>
              }}
          />
          <TextField
              margin="dense"
              label={t('ticketOrder.taxFee')}
              fullWidth
              type="number"
              value={form.taxFee || ''}
              onChange={e => setForm(f => ({ ...f, taxFee: e.target.value }))}
          />
          <TextField
              margin="dense"
              label={t('ticketOrder.insuranceFee')}
              fullWidth
              type="number"
              value={form.insuranceFee || ''}
              onChange={e => setForm(f => ({ ...f, insuranceFee: e.target.value }))}
          />
          <TextField
              margin="dense"
              label={t('ticketOrder.serviceFee')}
              fullWidth
              type="number"
              value={form.serviceFee || ''}
              onChange={e => setForm(f => ({ ...f, serviceFee: e.target.value }))}
          />
          {/* 行程列表弹窗编辑版 */}
          <div style={{ margin: '16px 0' }}>
            <InputLabel>{t('ticketOrder.tripList') || t('ticketOrder.flightList')}</InputLabel>
            <TableContainer component={Paper} style={{ marginTop: 8, marginBottom: 8 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('ticketOrder.flight')}</TableCell>
                    <TableCell>{t('ticketOrder.airline')}</TableCell>
                    <TableCell>{t('ticketOrder.depCity')}</TableCell>
                    <TableCell>{t('ticketOrder.arrCity')}</TableCell>
                    <TableCell>{t('common.action')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(form.flightList || []).map((trip, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{trip.flight}</TableCell>
                      <TableCell>{trip.airline || ''}</TableCell>
                      <TableCell>{trip.depCity || ''}</TableCell>
                      <TableCell>{trip.arrCity || ''}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => handleEditTrip(trip, idx)}>{t('common.edit')}</Button>
                        <Button size="small" onClick={() => handleDeleteTrip(trip, idx)}>{t('common.delete')}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={handleAddTrip} size="small">{t('ticketOrder.addFlight')}</Button>
          </div>
          {/* 乘客列表弹窗编辑版 */}
          <div style={{ margin: '16px 0' }}>
            <InputLabel>{t('ticketOrder.passengerList')}</InputLabel>
            <TableContainer component={Paper} style={{ marginTop: 8, marginBottom: 8 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('ticketOrder.passengerName')}</TableCell>
                    <TableCell>{t('ticketOrder.englishName')}</TableCell>
                    <TableCell>{t('ticketOrder.certificateType')}</TableCell>
                    <TableCell>{t('ticketOrder.certificateNo')}</TableCell>
                    <TableCell>{t('ticketOrder.phoneNumber')}</TableCell>
                    <TableCell>{t('common.action')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(form.passengerList || []).map((p, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.englishName}</TableCell>
                      <TableCell>{p.certificateType || ''}</TableCell>
                      <TableCell>{p.certificateNo || ''}</TableCell>
                      <TableCell>{p.phoneNumber || ''}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => handleEditPassenger(p, idx)}>{t('common.edit')}</Button>
                        <Button size="small" onClick={() => handleDeletePassenger(p, idx)}>{t('common.delete')}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={handleAddPassenger} size="small">{t('ticketOrder.addPassenger')}</Button>
            <Button onClick={() => setSelectPassengerDialogOpen(true)} size="small" style={{ marginLeft: 8 }}>{t('ticketOrder.selectPassenger')}</Button>
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
      <SelectPassengerDialog
        open={selectPassengerDialogOpen}
        onClose={() => setSelectPassengerDialogOpen(false)}
        passengerList={passengerList}
        onConfirm={selected => {
          setForm(f => ({
            ...f,
            passengerList: [...(f.passengerList || []), ...selected]
          }));
          setSelectPassengerDialogOpen(false);
        }}
      />
    </Dialog>
  );
};

export default TicketOrderFormDialog;
