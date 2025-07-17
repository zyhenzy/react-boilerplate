import http from '../../utils/http';
import { IOption} from './types';

// 性别下拉
export function getSexOptions() {
  return http.get<IOption[]>('/v1/Data/sexOptions');
}

// 国家手机编码下拉
export function getCountryOptions() {
  return http.get<IOption[]>('/v1/Data/countryOptions');
}

// 国家编码下拉
export function getCountryCodeOptions() {
  return http.get<IOption[]>('/v1/Data/countryCodeOptions');
}

// 城市下拉
export function getCityOptions(country:string){
  return http.get<IOption[]>('/v1/Data/cityOptions',{country});
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

// 产品下拉
export function getProductOptions(){
  return http.get<IOption[]>('/v1/Data/productOptions');
}

// 航司下拉
export function getAirlineOptions(){
  return http.get<IOption[]>('/v1/Data/airlineOptions');
}

// 机场下拉
export function getAirportOptions(){
  return http.get<IOption[]>('/v1/Data/airportOptions');
}

// 舱位等级
export function getClassTypeOptions(){
  return http.get<IOption[]>('/v1/Data/classTypeOptions');
}

// 餐食
export function getMealsOptions(){
  return http.get<IOption[]>('/v1/Data/mealsOptions');
}

// 根据产品查供应商options
export function getSupplierOptions(Type:string='') {
  return http.get<IOption[]>('/v1/Data/supplierOptions',{Type});
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