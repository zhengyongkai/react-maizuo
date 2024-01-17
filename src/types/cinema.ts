import type { district, tude } from "./location";

export interface cinemasInfoRequestInfo {
  cinemaId: string;
}

export interface cinemasInfoResponseInfo {
  data: {
    cinema: cinemasInfoInf;
  };
}

export interface servicesInf {
  name: string;
  description: string;
}

export type cinemasInfoInf = {
  Distance: number;
  address: string;
  businessTime: string;
  cinemaId: number;
  cityId: number;
  cityName: string;
  eTicketFlag: number;
  gpsAddress: string;
  isVisited: number;
  logoUrl: string;
  lowPrice: number;
  name: string;
  notice: string;
  phone: string;
  seatFlag: number;
  telephones: Array<string>;
  ticketTypes?: string;
  district: district;
  services?: Array<servicesInf>;
} & tude &
  district;

export interface cinemasInfoResponseInf {
  cinema: cinemasInfoInf;
}
