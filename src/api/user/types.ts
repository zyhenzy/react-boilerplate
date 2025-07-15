/**
 * 注册参数接口
 */
export interface RegisterParams {
  userName: string;
  name: string;
  sex?: 'M' | 'F' | 'O' | null; // 性别 M: 男, F: 女, O: 其他
  phoneNumber: string; // 手机号
  countryNumber: string; // 国家区号
  password: string;
  agentId?: string | null; // 代理ID
  role?: string[] | null; // 角色
  enable: boolean; // 是否启用
}

/**
 * 登录参数接口 todo：登录需要这么多参数吗？
 */
export interface LoginParams {
  countryNumber?: string;
  phoneNumber?: string;
  password: string;
  userName: string;
  isAdmin?: boolean; // 是否是后台管理系统
}

/**
 * 用户信息接口
 */
export interface IUser {
  id: string;
  userType: string; // 用户类型 0客户，1代理 2其他；仅前端用
  userName: string;
  name: string;
  sex?: 'M' | 'F' | 'O' | null;
  enable: boolean;
  createTime?: string;
  countryNumber: string;
  phoneNumber: string;
  createUserName?: string;
  email?:string;
  agentId?: string | null;
  customerId?: string | null; // 客户ID
  role?: string[] | null;
  roles?: string[] | null; // fixme:查详情返回的是roles，新增的时候用的是role
}
