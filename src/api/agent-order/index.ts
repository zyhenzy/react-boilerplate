import http from '../../utils/http';
import type { ListResponse } from '../types';
import {
  AgentOrderQuery,
  SubmitAgentOrderCommand,
  ReviewFailedAgentOrderCommand,
  ConvertedAgentOrderCommand,
  IssuedAgentOrderCommand,
  AgentOrder,
} from './types';

// 获取代理订单列表
export function getAgentOrderList(params?: AgentOrderQuery) {
  return http.get<ListResponse<AgentOrder>>('/v1/AgentOrder/list', { params });
}

// 获取代理订单详情
export function getAgentOrderDetail(id: string) {
  return http.get(`/v1/AgentOrder/${id}`);
}

// 提交代理订单
export function submitAgentOrder(data: SubmitAgentOrderCommand) {
  return http.post('/v1/AgentOrder/submit', data);
}

// 复核失败
export function reviewFailedAgentOrder(data: ReviewFailedAgentOrderCommand) {
  return http.post('/v1/AgentOrder/reviewFailed', data);
}

// 转换成功
export function convertedAgentOrder(data: ConvertedAgentOrderCommand) {
  return http.post('/v1/AgentOrder/converted', data);
}

// 已出票
export function issuedAgentOrder(data: IssuedAgentOrderCommand) {
  return http.post('/v1/AgentOrder/issued', data);
}
