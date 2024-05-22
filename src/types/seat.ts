import { realNameAuthInf } from "./auth";
import { cinemasInfoInf } from "./cinema";
import { hallInf } from "./hall";
import { moviceInf } from "./movice";
import priceInf, { sectionPricesInf } from "./price";

export interface lockSeatRulesInf {
  ruleCheckType: number;
  rules: Array<{ ruleType: number }>[];
}

export interface providerInf {
  providerId: number;
  scheduleId: string;
}

/**
 * @description: 座位信息
 * @param {cinemasInfoInf} cinema 影院信息;
   @param {moviceInf} film 电影信息;
   @param {number} advanceStopMins 结束时间;
   @param {number} endAt 结束时间;
   @param  {hallInf} hall 影院大厅信息 ;
   @param {string}  imagery;
   @param {boolean} isMobileRequiredForLocking 手机是否允许开启;
   @param {boolean} isOnsell 是否正在售票;
   @param {lockSeatRulesInf} lockSeatRulesInf 座位锁定规则;
   @param {number}  maxSeatsCount 最大座位数量;
   @param {string} noticeMsg 提示信息;
   @param  {priceInf} price 票价信息;
   @param {providerInf} provider 提供者;
   @param {realNameAuthInf} readNameAuth 实名认证;
   @param {number} scheduleId: 排场Id;
   @param {sectionPricesInf} sectionPrices 价格信息;
   @param  {number} showAt 开始时间;
 * 
 * @return {*}
 */
export interface seatInf {
  cinema: cinemasInfoInf;
  film: moviceInf;
  advanceStopMins: number;
  endAt: number;
  hall: hallInf;
  imagery: string;
  isMobileRequiredForLocking: boolean;
  isOnsell: boolean;
  lockSeatRulesInf: lockSeatRulesInf;
  maxSeatsCount: number;
  noticeMsg: string;
  price: priceInf;
  provider: providerInf;
  readNameAuth: realNameAuthInf;
  scheduleId: number;
  sectionPrices: sectionPricesInf;
  showAt: number;
}

export interface seatResponseInf {
  schedule: seatInf;
}

export interface seatRequestParamsInf {
  scheduleId: number;
}

// 座位简短信息
export interface seatsPosInf {
  columnId: string;
  columnNum: string;
  rowId: string;
  rowNum: string;
  sectionId: string;
  sectionName: string;
}

// 座位详细信息
export type seatsInf = {
  coupleType: number;
  isBroken: boolean;
  isOccupied: boolean;
  offerSeatId: string;
} & seatsPosInf;

export interface seatingChartInf {
  hall: hallInf;
  height: number;
  scheduleId: number;
  seats: Array<seatsInf>;
  width: number;
}

export interface seatListInf {
  seatingChart: seatingChartInf;
}

export interface selectSeatsInf {
  columnId: string;
  columnNum: string;
  rowId: string;
  rowNum: string;
  sectionId: string;
  sectionName: string;
  scheduleId: number;
  date: number;
  cinemaId: number;
}
