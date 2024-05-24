import { realNameAuthInf } from './auth';
import { cinemasInfoInf } from './cinema';
import { hallInf } from './hall';
import { moviceInf } from './movice';
import priceInf, { sectionPricesInf } from './price';

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

/**
 * @description: 座位返回信息
 * @return {*}
 */
export interface seatResponseInf {
  schedule: seatInf;
}

/**
 * @description: 座位简短信息
 * @param {string} columnId: string 列Id;
 * @param {string} columnNum: string 列数;
 * @param {string} rowId: string 行Id;
 * @param {string} rowNum: string 行数;
 * @param {string} sectionId: string 地址Id;
 * @param {string} sectionName: string 地址名字;
 */
export interface seatsPosInf {
  columnId: string;
  columnNum: string;
  rowId: string;
  rowNum: string;
  sectionId: string;
  sectionName: string;
}

/**
 * @description: 座位详细信息
 * @param {number} coupleType 位置类型（情侣座）:
 * @param {boolean} isBroken: 是否损坏 列数;
 * @param {boolean} isOccupied: 是否被霸占
 */
export type seatsInf = {
  coupleType: number;
  isBroken: boolean;
  isOccupied: boolean;
} & seatsPosInf;

/**
 * @description: 大厅座位详情
 * @param {hallInf} hall 礼堂信息
 * @param {height} height 屏幕高度
 * @param {number} scheduleId 排班Id
 * @param {Array<seatsInf>}  seats 座位列表
 * @param {number} width 屏幕宽度
 * @return {*}
 */
export interface seatingChartInf {
  hall: hallInf;
  height: number;
  scheduleId: number;
  seats: Array<seatsInf>;
  width: number;
}

/**
 * @description: 大厅作为列表
 * @param {seatingChartInf} 大厅作为详情
 */
export interface seatListInf {
  seatingChart: seatingChartInf;
}

/**
 * @description: 选择座位信息
 * @param {string} columnId 列数Id
 * @param {string} columnNum 列数编号
 * @param {string} rowId 行数Id
 * @param {string} rowNum 行数编号
 * @param {string} sectionId 地址Id
 * @param {string} sectionName 地址名称
 * @param {number} scheduleId 排班Id
 * @param {number} date 日期
 * @param {number} cinemaId 影院ID
 */
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
