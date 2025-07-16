import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TicketOrder } from '../../../api/ticket-order/types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface TicketOrderDetailDialogProps {
  open: boolean;
  onClose: () => void;
  order?: TicketOrder | null;
}

const TicketOrderDetailDialog: React.FC<TicketOrderDetailDialogProps> = ({ open, onClose, order }) => {
  const { t,i18n } = useTranslation();

  return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t('common.detail')}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1">{t('ticketOrder.billNo')}: {order?.billNo}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.bookerName')}: {order?.bookerName}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.bookerContact')}: {order?.bookerContact}</Typography>
          <Typography variant="subtitle1">PNR: {order?.pnr}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.status')}: {t(`ticketOrder.status_${order?.status}`)}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.supplier')}: {order?.supplierId}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.customer')}: {order?.customerId}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.adjustmentValue')}: {order?.adjustmentValue}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.currencyBooking')}: {order?.currencyBooking}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.changeRule')}: {order?.changeRule}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.refundRule')}: {order?.refundRule}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.originalTicketFee')}: {order?.originalTicketFee}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.ticketFee')}: {order?.ticketFee}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.taxFee')}: {order?.taxFee}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.insuranceFee')}: {order?.insuranceFee}</Typography>
          <Typography variant="subtitle1">{t('ticketOrder.serviceFee')}: {order?.serviceFee}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">{t('ticketOrder.passengerList')}:</Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
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
                  <TableCell>{t('ticketOrder.ticketNo')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(order?.passengerList || []).map((p) => (
                  <TableRow key={p.name}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.englishName}</TableCell>
                    <TableCell>{p.birthday}</TableCell>
                    <TableCell>
                      {/* todo:certificateType根据国际化显示，琦哥直接返type码即可 */}
                      {/*@ts-ignore*/}
                      {i18n.language === 'zh'?p.certificateType.name:p.certificateType.nameEn}
                    </TableCell>
                    <TableCell>{p.certificateNo}</TableCell>
                    <TableCell>{p.nationality}</TableCell>
                    <TableCell>{p.countryNumber}</TableCell>
                    <TableCell>{p.phoneNumber}</TableCell>
                    <TableCell>{p.ticketNo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">{t('ticketOrder.flightList')}:</Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t('ticketOrder.airline')}</TableCell>
                  <TableCell>{t('ticketOrder.flight')}</TableCell>
                  <TableCell>{t('ticketOrder.depCity')}</TableCell>
                  <TableCell>{t('ticketOrder.arrCity')}</TableCell>
                  <TableCell>{t('ticketOrder.depAirport')}</TableCell>
                  <TableCell>{t('ticketOrder.arrAirport')}</TableCell>
                  <TableCell>{t('ticketOrder.depTerminal')}</TableCell>
                  <TableCell>{t('ticketOrder.arrTerminal')}</TableCell>
                  <TableCell>{t('ticketOrder.depDate')}</TableCell>
                  <TableCell>{t('ticketOrder.depTime')}</TableCell>
                  <TableCell>{t('ticketOrder.arrDate')}</TableCell>
                  <TableCell>{t('ticketOrder.arrTime')}</TableCell>
                  <TableCell>{t('ticketOrder.cabinLevel')}</TableCell>
                  <TableCell>{t('ticketOrder.cabinCode')}</TableCell>
                  <TableCell>{t('ticketOrder.planCabinCode')}</TableCell>
                  <TableCell>{t('ticketOrder.flyingTime')}</TableCell>
                  <TableCell>{t('ticketOrder.aircraft')}</TableCell>
                  <TableCell>{t('ticketOrder.meals')}</TableCell>
                  <TableCell>{t('ticketOrder.luggageTransportationRule')}</TableCell>
                  <TableCell>{t('ticketOrder.luggageHandRule')}</TableCell>
                  <TableCell>{t('ticketOrder.stop')}</TableCell>
                  <TableCell>{t('ticketOrder.remark')}</TableCell>
                  {/*<TableCell>{t('ticketOrder.price')}</TableCell>*/}
                  {/*<TableCell>{t('ticketOrder.airportFee')}</TableCell>*/}
                  {/*<TableCell>{t('ticketOrder.fuelFee')}</TableCell>*/}
                </TableRow>
              </TableHead>
              <TableBody>
                {(order?.flightList || []).map((f, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{f.airline}</TableCell>
                    <TableCell>{f.flight}</TableCell>
                    <TableCell>{f.depCity}</TableCell>
                    <TableCell>{f.arrCity}</TableCell>
                    <TableCell>{f.depAirport}</TableCell>
                    <TableCell>{f.arrAirport}</TableCell>
                    <TableCell>{f.depTerminal}</TableCell>
                    <TableCell>{f.arrTerminal}</TableCell>
                    <TableCell>{f.depDate}</TableCell>
                    <TableCell>{f.depTime}</TableCell>
                    <TableCell>{f.arrDate}</TableCell>
                    <TableCell>{f.arrTime}</TableCell>
                    <TableCell>{f.cabinLevel}</TableCell>
                    <TableCell>{f.cabinCode}</TableCell>
                    <TableCell>{f.planCabinCode}</TableCell>
                    <TableCell>{f.flyingTime}</TableCell>
                    <TableCell>{f.aircraft}</TableCell>
                    <TableCell>{f.meals}</TableCell>
                    <TableCell>{f.luggageTransportationRule}</TableCell>
                    <TableCell>{f.luggageHandRule}</TableCell>
                    <TableCell>{f.stop !== undefined ? (f.stop ? t('common.yes') : t('common.no')) : ''}</TableCell>
                    <TableCell>{f.remark}</TableCell>
                    {/*<TableCell>{f.price}</TableCell>*/}
                    {/*<TableCell>{f.airportFee}</TableCell>*/}
                    {/*<TableCell>{f.fuelFee}</TableCell>*/}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('common.close') || t('close')}</Button>
        </DialogActions>
      </Dialog>
  );
};

export default TicketOrderDetailDialog;
