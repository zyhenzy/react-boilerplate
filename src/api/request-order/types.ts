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
  bookerName?: string | null; // 订票人姓名
  countryNumber?: string | null; // 国家区号
  phoneNumber?: string; // 电话号码
  remark?: string | null; // 备注
  passengerList?: AddRequestOrderPassengerCommand[];
  imageList?: string[];
  tripList?: AddRequestOrderTripCommand[];
  customerId?: string; // 客户ID
  status?: RequestOrderStatus;
  createdAt?: string;
  updatedAt?: string;
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

// 乘客
export interface AddRequestOrderPassengerCommand {
  name?: string; // 姓名
  englishName?: string; // 英文名
  birthday?: string; // 出生日期
  certificateType?: string; // 证件类型
  certificateNo?: string; // 证件号
  nationality?: string; // 国籍
  countryNumber?: string; // 国家号码
  phoneNumber?: string; // 手机
  ticketNo?: string; // 票号
}

// 行程
export interface AddRequestOrderTripCommand{
  dep?:string // 起飞城市
  arr?:string // 到达城市
  startTime?:string // 起飞时间
  endTime?:string // 到达时间
  flightNo?:string // 航班号
}