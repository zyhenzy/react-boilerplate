import http from '../../utils/http';
import type { Customer, CustomerQuery } from './types';
import type { ListResponse } from '../types';

// 获取代理列表
export function getCustomerList(params?: CustomerQuery) {
  return http.get<ListResponse<Customer>>('/v1/Customer/list', params);
}

// 获取代理详情
export function getCustomerDetail(id: string) {
  return http.get<Customer>(`/v1/Customer/${id}`);
}

// 新增代理
export function createCustomer(data: Omit<Customer, 'id'>) {
  return http.post('/v1/Customer/add', data);
}

// 更新代理
export function updateCustomer(data: Customer) {
  return http.post('/v1/Customer/update', data);
}

// 启用/禁用代理
export function enableCustomer(id: string, enable: boolean) {
  return http.post('/v1/Customer/enable', { id, enable });
}
