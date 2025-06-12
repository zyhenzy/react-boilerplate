// TicketOrder相关类型定义

// 机票订单状态
export enum TicketOrderStatus {
  待处理 = 0,
  已支付 = 1,
  已出票 = 2,
  已完成 = 3,
}

// 机票订单实体
export interface TicketOrder {
  id?: string;
  billNo?: string;
  bookerName?: string;
  bookerContact?: string;
  rateBooking?: number;
  pnr?: string;
  changeRule?: string;
  refundRule?: string;
  originalTicketFee?: number;
  ticketFee?: number;
  taxFee?: number;
  insuranceFee?: number;
  serviceFee?: number;
  flightList?: AddTicketOrderTripCommand[];
  passengerList?: AddTicketOrderPassengerCommand[];
  supplierId?: string;
  status?: TicketOrderStatus;
  createdAt?: string;
  updatedAt?: string;
  // 可根据实际接口补充字段
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
  rateBooking?: number;
  pnr?: string;
  changeRule?: string;
  refundRule?: string;
  originalTicketFee?: number;
  ticketFee?: number;
  taxFee?: number;
  insuranceFee?: number;
  serviceFee?: number;
  flightList?: AddTicketOrderTripCommand[];
  passengerList?: AddTicketOrderPassengerCommand[];
  supplierId?: string;
}

// 修改机票订单
export interface UpdateTicketOrderCommand {
  id: string;
  pnr?: string;
  bookerName?: string;
  bookerContact?: string;
  currency?: string;
  currencyBooking?: string;
  currencyPay?: string;
  rateBooking?: number;
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
  ratePay?: number;
  payType?: string;
}

// 出票
export interface IssuedTicketOrderCommand {
  id: string;
  currency?: string;
}

// 修改LOGO
export interface UpdateTicketOrderLogoCommand {
  id: string;
  logoId: string;
}

// 新增行程
export interface AddTicketOrderTripCommand {
  ticketOrderId?: string;
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
  cabinLevel?: string;
  planCabinCode?: string;
  cabinCode?: string;
  depTerminal?: string;
  arrTerminal?: string;
  flyingTime?: number;
  aircraft?: string;
  meals?: string;
  luggageTransportationRule?: string;
  luggageHandRule?: string;
  stop?: boolean;
  remark?: string;
  price?: number;
  airportFee?: number;
  fuelFee?: number;
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
  remark?: string;
  price?: number;
  airportFee?: number;
  fuelFee?: number;
}

// 删除行程
export interface DeleteTicketOrderTripCommand {
  id: string;
}

// 新增乘客
export interface AddTicketOrderPassengerCommand {
  ticketOrderId?: string;
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
}

// 删除乘客
export interface DeleteTicketOrderPassengerCommand {
  id: string;
}

