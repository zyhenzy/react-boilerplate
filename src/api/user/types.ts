/**
 * 注册参数接口
 */
export interface RegisterParams {
  userName: string;
  name: string;
  sex?: 'M' | 'F' | 'O' | null; // todo：性别 M: 男, F: 女, O: 其他
  phoneNumber: string; // todo：手机号，是11位吧？
  countryNumber: string; // todo：国家区号
  password: string;
  agentId?: string | null; // todo：代理ID，字符串
  role?: string | null; // todo 角色，字符串？
  enable: boolean; // todo：是否启用，true: 启用，false: 禁用
}

/**
 * 登录参数接口 todo：登录需要这么多参数吗？
 */
export interface LoginParams {
  countryNumber?: string; // todo：国家区号，字符串
  phoneNumber?: string; // todo：手机号，字符串
  password: string;
  userName: string;
  isAdmin?: boolean; // 是否是后台管理系统
}

/**
 * 用户信息接口
 */
export interface IUser {
  id: string;
  userName: string;
  name: string;
  sex?: 'M' | 'F' | 'O' | null;
  enable: boolean;
  createTime?: string;
  countryNumber: string;
  phoneNumber: string;
  createUserName?: string;
  agentId?: string | null;
  role?: string | null;
}
