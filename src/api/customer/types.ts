// Customer实体类型，对应后端Customer相关字段
export interface Customer {
  id?: string; // 主键ID，可选
  name: string; // 名称，必填，最大50
  contact: string; // 联系方式，必填，最大50
  countryCode?: string | null; // 国家代码，可空，最大2
  currency?: string | null; // 币种，可空，最大3
  invoiceHeader?: string | null; // 发票抬头，可空，最大50
  invoiceTaxNumber?: string | null; // 发票税号，可空，最大50
  enable: boolean; // 启用
}

// Customer列表查询参数，对应后端接口Query参数
export interface CustomerQuery {
  Name?: string; // 名称
  CountryCode?: string; // 国家代码
  PageIndex?: number; // 页码
  PageSize?: number; // 每页数量
  SortField?: string; // 排序字段
  IsDesc?: boolean; // 是否倒序
  Ordering?: string; // 排序表达式
}