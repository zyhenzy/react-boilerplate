import http from '../../utils/http';

/**
 * 注册用户接口
 * @param params 注册参数
 * @returns Promise<any>
 */
export function registerUser(params: RegisterParams) {
  return http.post('/v1/User/register', params)
}

/**
 * 注册参数接口
 */
export interface RegisterParams {
  userName: string;
  name: string;
  sex?: 'M' | 'F' | 'O' | null;
  phoneNumber: string;
  countryNumber: string;
  password: string;
  agentId?: string | null;
  role?: string | null;
  enable: boolean;
}
