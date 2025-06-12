import http from '../../utils/http';
import type { Agent, AgentQuery } from './types';
import type { ListResponse } from '../types';

// 获取代理列表
export function getAgentList(params?: AgentQuery) {
  return http.get<ListResponse<Agent>>('/v1/Agent/list', { params });
}

// 获取代理详情
export function getAgentDetail(id: string) {
  return http.get(`/v1/Agent/${id}`);
}

// 新增代理
export function createAgent(data: Omit<Agent, 'id'>) {
  return http.post('/v1/Agent/add', data);
}

// 更新代理
export function updateAgent(data: Agent) {
  return http.post('/v1/Agent/update', data);
}

// 启用/禁用代理
export function enableAgent(id: string, enable: boolean) {
  return http.post('/v1/Agent/enable', { id, enable });
}
