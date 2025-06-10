// Supplier实体类型，对应后端Supplier相关字段
export interface Supplier {
  id?: string; // 主键ID，可选
  name: string; // 名称，必填，最大50
  contact: string; // 联系方式，必填，最大50
  currency: string; // 币种，必填，最大5
  enable: boolean; // 启用
  logoId?: string; // Logo图片ID，可选
}

// Supplier列表查询参数，对应后端接口Query参数
export interface SupplierQuery {
  Name?: string; // 名称
  PageIndex?: number; // 页码
  PageSize?: number; // 每页数量
  SortField?: string; // 排序字段
  IsDesc?: boolean; // 是否倒序
  Ordering?: string; // 排序表达式
}

