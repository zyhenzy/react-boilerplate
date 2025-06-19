// AgentOrder相关类型定义

// 订单类型
export enum AgentOrderType {
  普通 = 0,
  改期 = 1,
  退票 = 2,
}

// 订单状态
export enum AgentOrderStatus {
  待处理 = 0,
  TC复合失败 = 1,
  TC转换成功 = 2,
  代理人拒绝 = 3,
  代理人接受 = 4,
  TC出票 = 5,
}

// 代理订单实体
export interface AgentOrder {
  id?: string;
  orderNo?: string;
  type?: AgentOrderType;
  status?: AgentOrderStatus;
  price?: number;
  tax?: number;
  serviceCharge?: number;
  pnr?: string;
  agentRemark?: string;
  tcRemark?: string;
  createdAt?: string;
  updatedAt?: string;
  // 可根据实际接口补充字段
}

// 查询参数
export interface AgentOrderQuery {
  OrderNo?: string;
  StartDate?: string;
  EndDate?: string;
  Type?: AgentOrderType;
  Status?: AgentOrderStatus;
  PageIndex?: number;
  PageSize?: number;
  SortField?: string;
  IsDesc?: boolean;
  Ordering?: string;
}

// 提交代理订单
export interface SubmitAgentOrderCommand {
  type: AgentOrderType;
  pnr?: string;
  price: number;
  tax: number;
  serviceCharge: number;
  agentRemark?: string;
}

// 复核失败
export interface ReviewFailedAgentOrderCommand {
  id: string;
  reason: string;
  tcRemark?: string;
}

// 转换成功
export interface ConvertedAgentOrderCommand {
  id: string;
  pnr?: string;
  price: number;
  tax: number;
  serviceCharge: number;
  issuanceTimeLimit: string;
  tcRemark?: string;
}

// 代理人拒绝
export interface RefuseAgentOrderCommand {
  id: string;
  reason: string;
  agentRemark?: string;
}

// 代理人接受
export interface AcceptAgentOrderCommand {
  id: string;
  agentRemark?: string;
}

// 已出票
export interface IssuedAgentOrderCommand {
  id: string;
  pnr?: string;
  price: number;
  tax: number;
  serviceCharge: number;
  tcRemark?: string;
}

