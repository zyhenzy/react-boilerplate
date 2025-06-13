import http from '../../utils/http';
import { IOption} from './types';

// 国家编码下拉
export function getCountryOptions() {
  return http.get<IOption[]>('/v1/Data/countryOptions');
}

// 角色下拉
export function getRoleOptions() {
  return http.get<IOption[]>('/v1/Data/roleOptions');
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