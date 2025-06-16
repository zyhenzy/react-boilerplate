import http from '../../utils/http';
import {RegisterParams, LoginParams, IUser} from "./types";
import { setUserInfo, clearUserInfo } from '../../store/userSlice';
import { AppDispatch } from '../../store';
import type {ListResponse} from "../types";

/**
 * 注册
 * @param params 注册参数
 * @returns Promise<any>
 */
export function registerUser(params: RegisterParams) {
  return http.post('/v1/User/register', params);
}

/**
 * 登录用户接口
 * @param params 登录参数
 * @returns Promise<any>
 */
export function loginUser(params: LoginParams) {
  const _params:LoginParams = Object.assign({isAdmin:true}, params);
  return http.post('/v1/User/login', _params);
}

/**
 * 登录的用户信息
 * @returns Promise<any>
 */
export function infoUser() {
  return http.get<IUser>('/v1/User/info');
}

/**
 * 获取并存储当前用户信息
 * @param dispatch redux dispatch
 * @returns Promise<any> 用户信息
 */
export async function getAndStoreUserInfo(dispatch: AppDispatch) {
  try {
    const userInfoRes = await infoUser();
    dispatch(setUserInfo(userInfoRes));
    return userInfoRes;
  } catch (e) {
    dispatch(clearUserInfo());
    throw e;
  }
}

/**
 * 添加用户
 * @param params AddUserCommand
 * @returns Promise<any>
 */
export function addUser(params: any) {
  return http.post('/v1/User/add', params);
}

/**
 * 更新用户
 * @param params UpdateUserCommand
 * @returns Promise<any>
 */
export function updateUser(params: any) {
  return http.post('/v1/User/update', params);
}

/**
 * 启用/禁用用户
 * @param params EnableUserCommand
 * @returns Promise<any>
 */
export function enableUser(params: any) {
  return http.post('/v1/User/enable', params);
}

/**
 * 用户列表
 * @param params 查询参数
 * @returns Promise<any>
 */
export function getUserList(params?: any) {
  return http.get<ListResponse<Omit<IUser, 'role'>>>('/v1/User/list', { params });
}

/**
 * 用户详情
 * @param id 用户ID
 * @returns Promise<any>
 */
export function getUserDetail(id: string) {
  return http.get<IUser>(`/v1/User/${id}`);
}

/**
 * 刷新Token
 * @returns Promise<any>
 */
export function refreshUserToken() {
  return http.get('/v1/User/refreshToken');
}
