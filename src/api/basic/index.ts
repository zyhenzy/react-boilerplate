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
