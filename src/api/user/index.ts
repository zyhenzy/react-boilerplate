import http from '../../utils/http';
import {RegisterParams, LoginParams} from "./data";

/**
 * 注册用户接口
 * @param params 注册参数
 * @returns Promise<any>
 */
export function registerUser(params: RegisterParams) {
  return http.post('/v1/User/register', params)
}

/**
 * 登录用户接口
 * @param params 登录参数
 * @returns Promise<any>
 */
export function loginUser(params: LoginParams) {
  return http.post('/v1/User/login', params);
}

/**
 * 登录的用户信息
 * @returns Promise<any>
 */
export function infoUser() {
  return http.get('/v1/User/info');
}