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
