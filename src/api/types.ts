// 通用列表返回类型
export interface ListResponse<T> {
  total: number;
  data: T[];
}

