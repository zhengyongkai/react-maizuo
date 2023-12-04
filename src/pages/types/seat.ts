import { realNameAuthInf } from "./auth";
import { cinemasInfoImf } from "./cinema";
import { hallInf } from "./hall";
import { moviceImf } from "./movice";
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
  cinema: cinemasInfoImf;
  film: moviceImf;
  advanceStopMins: number;
  endAT: number;
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

export interface seatsInf {
  columnId: string;
  columnNum: string;
  coupleType: number;
  isBroken: boolean;
  isOccupied: boolean;
  offerSeatId: string;
  rowId: string;
  rowNum: string;
  sectionId: string;
  sectionName: string;
}

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
