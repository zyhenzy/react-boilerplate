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
  dep?: string; // 出发地
  arr?: string; // 到达地
  countryNumber?: string | null; // 国家号码
  phoneNumber?: string | null; // 手机
  remark?: string | null; // 备注
  passengerList?: AddRequestOrderPassengerCommand[]; // 乘客列表
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

// 修改需求订单
export interface UpdateRequestOrderCommand {
  id: string;
  status: RequestOrderStatus;
  remark?: string;
}

