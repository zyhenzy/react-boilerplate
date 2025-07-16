// 乘客相关类型定义

export interface Passenger {
  id?: string;
  name: string;
  englishName: string;
  birthday?: string;
  certificateType: string;
  certificateNo: string;
  nationality: string;
  countryNumber: string;
  phoneNumber: string;
  sex:string
  validity:string // 证件有效期
  default?: boolean;
}

export interface PassengerQuery {
  Id:string // 客户ID
  PageIndex?: number;
  PageSize?: number;
  SortField?: string;
  IsDesc?: boolean;
  Ordering?: string;
}

