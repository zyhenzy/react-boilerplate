import http from '../../utils/http';
import type { Passenger, PassengerQuery } from './types';
import type { ListResponse } from '../types';

// 获取乘客列表
export function getPassengerListByCustomer(params?: PassengerQuery) {
  return http.get<ListResponse<Passenger>>('/v1/Passenger/customerList', params);
}

// 获取乘客详情
export function getPassengerDetail(id: string) {
  return http.get<Passenger>(`/v1/Passenger/${id}`);
}

