import React, { useEffect, useState } from 'react';
import type { RequestOrder} from "../../api/request-order/types";
import { getRequestOrderList } from "../../api/request-order";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination, Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RequestOrderDetailDialog from './components/RequestOrderDetailDialog';
import { useTranslation } from 'react-i18next';
import { getRequestOrderDetail } from '../../api/request-order';
import TicketOrderFormDialog from "../TicketOrder/components/TicketOrderFormDialog";
import type {Supplier} from "../../api/supplier/types";
import {getSupplierList} from "../../api/supplier";
import type {TicketOrder} from "../../api/ticket-order/types";
import {addTicketOrder} from "../../api/ticket-order";

const RequestOrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<RequestOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState<RequestOrder | null>(null);
  const [editingOrder, setEditingOrder] = useState<TicketOrder | null>(null);

  // 获取供应商列表
  const fetchSuppliers = async () => {
    const res = await getSupplierList({ PageIndex: 1, PageSize: 100 });
    setSuppliers(res.data || []);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getRequestOrderList({ PageIndex: pageIndex + 1, PageSize: pageSize });
      setData(res.data || []);
      setTotal(res.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  const handleViewDetail = async (order: RequestOrder) => {
    setDetailDialogOpen(true);
    const res = await getRequestOrderDetail(order.id!);
    setDetailOrder(res || null);
  };

  const handleTrans = async (order: RequestOrder) => {
    const res: RequestOrder = await getRequestOrderDetail(order.id as string);
    // 字段映射，需根据实际字段调整
    const ticketOrder: TicketOrder = {
      flightList:[{
        depCity:res.dep,
        arrCity:res.arr,
      }],
      passengerList:res.passengerList?.map(p=>{
        return {
          name:p.name,
          englishName:p.englishName,
          birthday:p.birthday,
          certificateType:p.certificateType,
          certificateNo:p.certificateNo,
          nationality:p.nationality,
          countryNumber:p.countryNumber,
          phoneNumber:p.phoneNumber,
          ticketNo:p.ticketNo,
        }
      })
    };
    setEditingOrder(ticketOrder);
    setDialogOpen(true);
  };

  const handleSubmit = async (values: Partial<TicketOrder>) => {
    await addTicketOrder({
      pnr: values.pnr ?? undefined,
      bookerName: values.bookerName ?? undefined,
      bookerContact: values.bookerContact ?? undefined,
      rateBooking: values.rateBooking ?? undefined,
      changeRule: values.changeRule ?? undefined,
      refundRule: values.refundRule ?? undefined,
      originalTicketFee: values.originalTicketFee ?? undefined,
      ticketFee: values.ticketFee ?? undefined,
      taxFee: values.taxFee ?? undefined,
      insuranceFee: values.insuranceFee ?? undefined,
      serviceFee: values.serviceFee ?? undefined,
      flightList: values.flightList,
      passengerList: values.passengerList,
      supplierId: values.supplierId ?? undefined,
      customerId: values.customerId ?? undefined,
    });
    setDialogOpen(false);
    setEditingOrder(null);
    fetchData();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>{t('requestOrder.title')}</h2>
        {/*<Button variant="contained" onClick={handleAdd}>{t('requestOrder.add')}</Button>*/}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('requestOrder.dep')}</TableCell>
              <TableCell>{t('requestOrder.arr')}</TableCell>
              <TableCell>{t('requestOrder.phoneNumber')}</TableCell>
              <TableCell>{t('requestOrder.status')}</TableCell>
              <TableCell>{t('requestOrder.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8} align="center">{t('requestOrder.loading')}</TableCell></TableRow>
            ) : data.length === 0 ? (
              <TableRow><TableCell colSpan={8}>{t('requestOrder.noData')}</TableCell></TableRow>
            ) : (
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.dep}</TableCell>
                  <TableCell>{item.arr}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{t(`requestOrder.status_${item.status}`)}</TableCell>
                  <TableCell>
                    {item.status===0&&<Button size="small" onClick={() => handleTrans(item)}>{t('requestOrder.trans')}</Button>}
                    <IconButton size="small" onClick={() => handleViewDetail(item)} disabled={loading}><VisibilityIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={pageIndex}
        onPageChange={(_, newPage) => setPageIndex(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={e => { setPageSize(Number(e.target.value)); setPageIndex(0); }}
        rowsPerPageOptions={[10, 20, 50]}
      />
      <RequestOrderDetailDialog
        open={detailDialogOpen}
        onClose={() => { setDetailDialogOpen(false); setDetailOrder(null); }}
        order={detailOrder}
      />
      <TicketOrderFormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleSubmit}
          form={editingOrder || {}}
          setForm={setEditingOrder as any}
          editingId={null}
          suppliers={suppliers}
      />
    </Box>
  );
};

export default RequestOrderPage;
