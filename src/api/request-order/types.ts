// RequestOrder相关类型定义

// 需求订单状态
export enum RequestOrderStatus {
  待处理 = 0,
  已处理 = 1,
  已取消 = 2,
}

// 需求订单实体
export interface RequestOrder {
  id?: string;
  dep?: string | null;
  arr?: string | null;
  countryNumber?: string | null;
  phoneNumber?: string | null;
  remark?: string | null;
  passengerList?: AddRequestOrderPassengerCommand[];
  imageList?: string[];
  status?: RequestOrderStatus;
  createdAt?: string;
  updatedAt?: string;
  // 可根据实际接口补充字段
}

// 查询参数
export interface RequestOrderQuery {
  Dep?: string;
  Arr?: string;
  BillNo?: string;
  PageIndex?: number;
  PageSize?: number;
  SortField?: string;
  IsDesc?: boolean;
  Ordering?: string;
}

// 添加需求订单
export interface AddRequestOrderCommand {
  dep?: string;
  arr?: string;
  countryNumber?: string;
  phoneNumber?: string;
  remark?: string;
  passengerList?: AddRequestOrderPassengerCommand[];
  imageList?: string[];
}

// 乘客
export interface AddRequestOrderPassengerCommand {
  name?: string;
  englishName?: string;
  birthday?: string;
  certificateType?: string;
  certificateNo?: string;
  nationality?: string;
  countryNumber?: string;
  phoneNumber?: string;
  ticketNo?: string;
}

// 修改需求订单
export interface UpdateRequestOrderCommand {
  id: string;
  status: RequestOrderStatus;
  remark?: string;
}

