import http from '../../utils/http';
import type { Supplier, SupplierQuery } from './types';

// 获取供应商列表
export function getSupplierList(params?: SupplierQuery) {
  return http.get('/v1/Supplier/list', { params });
}

// 获取供应商详情
export function getSupplierDetail(id: string) {
  return http.get(`/v1/Supplier/${id}`);
}

// 新增供应商
export function createSupplier(data: Omit<Supplier, 'id'>) {
  return http.post('/v1/Supplier/add', data);
}

// 更新供应商
export function updateSupplier(data: Supplier) {
  return http.post('/v1/Supplier/update', data);
}

// 启用/禁用供应商
export function enableSupplier(id: string, enable: boolean) {
  return http.post('/v1/Supplier/enable', { id, enable });
}

