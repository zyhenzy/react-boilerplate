import http from '../../utils/http';
import {
  TicketOrderQuery,
  AddTicketOrderCommand,
  UpdateTicketOrderCommand,
  CancelTicketOrderCommand,
  PayedTicketOrderCommand,
  IssuedTicketOrderCommand,
  UpdateTicketOrderLogoCommand,
  AddTicketOrderTripCommand,
  UpdateTicketOrderTripCommand,
  DeleteTicketOrderTripCommand,
  AddTicketOrderPassengerCommand,
  UpdateTicketOrderPassengerCommand,
  DeleteTicketOrderPassengerCommand, TicketOrder,
} from './types';
import {ListResponse} from "../types";

// 获取机票订单列表
export function getTicketOrderList(params?: TicketOrderQuery) {
  return http.get<ListResponse<TicketOrder>>('/v1/TicketOrder/list', { params });
}

// 获取机票订单用户列表
export function getTicketOrderUserList(params?: TicketOrderQuery) {
  return http.get('/v1/TicketOrder/userList', { params });
}

// 获取机票订单详情
export function getTicketOrderDetail(id: string) {
  return http.get<TicketOrder>(`/v1/TicketOrder/${id}`);
}

// 添加机票订单
export function addTicketOrder(data: AddTicketOrderCommand) {
  return http.post('/v1/TicketOrder/add', data);
}

// 修改机票订单
export function updateTicketOrder(data: UpdateTicketOrderCommand) {
  return http.post('/v1/TicketOrder/update', data);
}

// 取消机票订单
export function cancelTicketOrder(data: CancelTicketOrderCommand) {
  return http.post('/v1/TicketOrder/cancel', data);
}

// 支付机票订单
export function payedTicketOrder(data: PayedTicketOrderCommand) {
  return http.post('/v1/TicketOrder/payed', data);
}

// 出票
export function issuedTicketOrder(data: IssuedTicketOrderCommand) {
  return http.post('/v1/TicketOrder/issued', data);
}

// 修改LOGO
export function updateTicketOrderLogo(data: UpdateTicketOrderLogoCommand) {
  return http.post('/v1/TicketOrder/updateLogo', data);
}

// 新增行程
export function addTicketOrderTrip(data: AddTicketOrderTripCommand) {
  return http.post('/v1/TicketOrder/addTrip', data);
}

// 修改行程
export function updateTicketOrderTrip(data: UpdateTicketOrderTripCommand) {
  return http.post('/v1/TicketOrder/updateTrip', data);
}

// 删除行程
export function deleteTicketOrderTrip(data: DeleteTicketOrderTripCommand) {
  return http.post('/v1/TicketOrder/deleteTrip', data);
}

// 新增乘客
export function addTicketOrderPassenger(data: AddTicketOrderPassengerCommand) {
  return http.post('/v1/TicketOrder/addPassenger', data);
}

// 修改乘客
export function updateTicketOrderPassenger(data: UpdateTicketOrderPassengerCommand) {
  return http.post('/v1/TicketOrder/updatePassenger', data);
}

// 删除乘客
export function deleteTicketOrderPassenger(data: DeleteTicketOrderPassengerCommand) {
  return http.post('/v1/TicketOrder/deletePassenger', data);
}


