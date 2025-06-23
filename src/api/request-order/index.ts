import http from '../../utils/http';
import {
  RequestOrderQuery,
  AddRequestOrderCommand,
  UpdateRequestOrderCommand,
  RequestOrder,
} from './types';
import type {ListResponse} from "../types";

// 获取需求订单列表
export function getRequestOrderList(params?: RequestOrderQuery) {
  return http.get<ListResponse<RequestOrder>>('/v1/RequestOrder/list', { params });
}

// 获取需求订单详情
export function getRequestOrderDetail(id: string) {
  return http.get<RequestOrder>(`/v1/RequestOrder/${id}`);
}

// 添加需求订单
export function addRequestOrder(data: AddRequestOrderCommand) {
  return http.post('/v1/RequestOrder/add', data);
}

// 修改需求订单
export function updateRequestOrder(data: UpdateRequestOrderCommand) {
  return http.post('/v1/RequestOrder/update', data);
}

