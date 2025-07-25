// TicketOrder相关类型定义

// 机票订单状态
export enum TicketOrderStatus {
  已预定 = 0,
  已取消 = 1,
  已结算 = 2,
  已出票 = 3,
}

// 机票订单实体
export interface TicketOrder {
  id?: string; // 订单ID fixme：确定下是否存在
  billNo?: string; // 订单号，fixme：确定下是否存在
  isRequest?:boolean // 是否是航班需求订单转换的（仅前端使用）
  bookerName?: string; // 订票人
  bookerContact?: string; // 订票人联系方式
  pnr?: string; // PNR
  changeRule?: string; // 改期规则
  refundRule?: string; // 退票规则
  originalTicketFee?: number|string; // 原票价
  ticketFee?: number|string; // 票价
  taxFee?: number|string; // 税
  insuranceFee?: number|string; // 保险费
  flightList?: AddTicketOrderTripCommand[]; // 航班集合
  passengerList?: AddTicketOrderPassengerCommand[]; // 乘客集合
  supplierId?: string; // 供应商ID
  customerId?: string; // 客户ID
  adjustmentValue?: number|string; // 调整值
  // 以下字段是修改用的
  // payType?:string // 支付方式
  issueTime?:string // 出票时间
  currencyBooking?:string; // 预定币种（只有在修改的时候有）
  serviceFee?: number|string; // 服务费
  status?: TicketOrderStatus; // 订单状态
  createdAt?: string; // 创建时间
  updatedAt?: string; // 更新时间
  // 可根据实际接口补充字段
  type?:0|1; // 订单类型（仅查看） 0国内 1国际
}

// 查询参数
export interface TicketOrderQuery {
  BillNo?: string;
  StartDate?: string;
  EndDate?: string;
  PassengerName?: string;
  TicketNo?: string;
  PageIndex?: number;
  PageSize?: number;
  SortField?: string;
  IsDesc?: boolean;
  Ordering?: string;
}

// 添加机票订单
export interface AddTicketOrderCommand {
  bookerName?: string;
  bookerContact?: string;
  adjustmentValue?: number;
  pnr?: string;
  changeRule?: string;
  refundRule?: string;
  originalTicketFee?: number;
  ticketFee?: number;
  taxFee?: number;
  insuranceFee?: number;
  serviceFee?: number;
  flightList?: AddTicketOrderTripCommand[];
  passengerList?: AddTicketOrderPassengerCommand[]|UpdateTicketOrderPassengerCommand[];
  supplierId?: string;
  customerId?: string;
}

// 修改机票订单
export interface UpdateTicketOrderCommand {
  id: string;
  pnr?: string;
  bookerName?: string;
  bookerContact?: string;
  currency?: string;
  currencyBooking?: string; // 预定币种（只有在修改的时候有）
  currencyPay?: string;
  adjustmentValue?: number;
  ratePay?: number;
  changeRule?: string;
  refundRule?: string;
  originalTicketFee?: number;
  ticketFee?: number;
  taxFee?: number;
  insuranceFee?: number;
  serviceFee?: number;
  payType?: string;
  status?: TicketOrderStatus;
  logoId?: string;
}

// 取消机票订单
export interface CancelTicketOrderCommand {
  id: string;
}

// 支付机票订单
export interface PayedTicketOrderCommand {
  id: string;
  currencyPay?: string;
  ratePay?: number|string;
  payType?: string;
}

// 出票
export interface IssuedTicketOrderCommand {
  id: string;
  passengerList: { id: string; ticketNo: string }[];
}

// 修改LOGO
export interface UpdateTicketOrderLogoCommand {
  id: string;
  logoId: string;
}

// 新增行程
export interface AddTicketOrderTripCommand {
  ticketOrderId?: string; // 机票订单ID
  airline?: string; // 航空公司
  flight?: string; // 航班
  depDate?: string; // 起飞日期
  arrDate?: string; // 到达日期
  depTime?: string; // 起飞时间
  arrTime?: string; // 到达时间
  depCity?: string; // 起飞城市
  arrCity?: string; // 到达城市
  depAirport?: string; // 起飞机场
  arrAirport?: string; // 到达机场
  cabinLevel?: string; // 舱位等级
  planCabinCode?: string; // 计划舱位代码
  cabinCode?: string; // 舱位代码
  depTerminal?: string; // 起飞航站楼
  arrTerminal?: string; // 到达航站楼
  flyingTime?: number|string; // 飞行时间
  aircraft?: string; // 机型
  meals?: string; // 餐食
  luggageTransportationRule?: string; // 行李托运规则
  luggageHandRule?: string; // 行李手提规则
  stop?: boolean; // 经停
  stopAirport?: string; // 经停机场
  stopTime?: string; // 经停时间
  remark?: string; // 备注
  // price?: number|string; // 价格
  // airportFee?: number|string; // 机建费
  // fuelFee?: number|string; // 燃油费
}

// 修改行程
export interface UpdateTicketOrderTripCommand {
  id: string;
  ticketNo?: string;
  airline?: string;
  flight?: string;
  depDate?: string;
  arrDate?: string;
  depTime?: string;
  arrTime?: string;
  depCity?: string;
  arrCity?: string;
  depAirport?: string;
  arrAirport?: string;
  depTerminal?: string;
  arrTerminal?: string;
  flyingTime?: number;
  cabinLevel?: string;
  cabinCode?: string;
  aircraft?: string;
  meals?: string;
  luggageTransportationRule?: string;
  luggageHandRule?: string;
  stop?: boolean;
  stopAirport?: string; // 经停机场
  stopTime?: string; // 经停时间
  remark?: string;
  // price?: number;
  // airportFee?: number;
  // fuelFee?: number;
}

// 删除行程
export interface DeleteTicketOrderTripCommand {
  id: string;
}

// 新增乘客
export interface AddTicketOrderPassengerCommand {
  id?:string // 乘客ID，新增时不需要传
  ticketOrderId?: string; // 机票订单ID
  name?: string; // 姓名
  englishName?: string; // 英文名
  birthday?: string; // 生日
  certificateType?: string; // 证件类型
  certificateNo?: string; // 证件号
  nationality?: string; // 国籍
  countryNumber?: string; // 国家号码
  phoneNumber?: string; // 手机
  ticketNo?: string; // 票号
  sex?:string // 性别
  validity?:string // 证件有效期
}

// 修改乘客
export interface UpdateTicketOrderPassengerCommand {
  id: string;
  name?: string;
  englishName?: string;
  birthday?: string;
  certificateType?: string;
  certificateNo?: string;
  nationality?: string;
  countryNumber?: string;
  phoneNumber?: string;
  ticketNo?: string;
  sex?:string // 性别
  validity?:string // 证件有效期
}

// 删除乘客
export interface DeleteTicketOrderPassengerCommand {
  id: string;
}
