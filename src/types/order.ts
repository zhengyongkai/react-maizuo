import { selectSeatsInf } from './seat';

export interface preOrderParams {
  cinemaId: number;
  cinemaName: string;
  showAt: number;
  endAt: number;
  hallId: string;
  hallName: string;
  filmId: number;
  filmName: string;
  scheduleId: number;
  seatList: selectSeatsInf[];
  price: number;
  address: string;
  poster: string;
  cinemaPhone: string;
}

export type preOrderEntity = preOrderParams & {
  oNum: string;
  statusName: string;
  status: number;
  orderId: number;
  createDate: number;
  tradeNo: string;
  tradeTime: number;
  actualPrice: number;
};
