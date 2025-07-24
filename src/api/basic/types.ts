// Agent实体类型，对应后端Agent相关字段
export interface IOption {
  label: string;
  value: string;
  labelEn?: string;
  [key: string]: any; // 支持任意扩展字段
}

