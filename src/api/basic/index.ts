import http from '../../utils/http';
import { IOption} from './types';

// 国家手机编码下拉
export function getCountryOptions() {
  return http.get<IOption[]>('/v1/Data/countryOptions');
}

// 国家编码下拉
export function getCountryCodeOptions() {
  return http.get<IOption[]>('/v1/Data/countryCodeOptions');
}

// 角色下拉
export function getRoleOptions() {
  return http.get<IOption[]>('/v1/Data/roleOptions');
}

// 证件类型下拉
export function getCertificateOptions() {
  return http.get<IOption[]>('/v1/Data/certificateOptions');
}

// 代理下拉
export function getAgentOptions() {
  return http.get<IOption[]>('/v1/Data/agentOptions');
}

// 客户下拉
export function getCustomerOptions() {
  return http.get<IOption[]>('/v1/Data/customerOptions');
}


// 上传图片接口，支持自定义 headers
export function uploadImage(formData: FormData) {
  return http.post<string>('/v1/Image/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export function getImage(imageId: string) {
  return `/api/v1/Image/${imageId}`
}