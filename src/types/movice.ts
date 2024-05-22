import type { districtInf } from "@/types/location";
import { userSimpleInf } from "./user";
import { cinemasInfoInf } from "./cinema";

export interface anctorInf {
  name: string;
  role: string;
  avatarAddress: string;
}

export interface moviceInf {
  filmId: number;
  name: string;
  category: string;
  synopsis: string;
  poster: string;
  grade: string;
  actors: Array<anctorInf>;
  runtime: number;
  nation: string;
  language?: string;
}

export interface moviceParams {
  pageNum: number;
  pageSize: number;
  cityId: number;
  total: number;
}

export interface itemInf {
  name: string;
  type: number;
}

export interface filmTypeInf {
  name: string;
  value: number;
}

export interface detailsInf {
  actors: Array<anctorInf>;
  category: string;
  director: string;
  filmId: number;
  filmType: filmTypeInf;
  isPresale: boolean;
  isSale: boolean;
  item: itemInf;
  language: string;
  name: string;
  nation: string;
  photos: Array<string>;
  poster: string;
  premiereAt: number;
  runtime: number;
  synopsis: string;
  timeType: number;
  videoId: string;
  grade?: number;
  showDate?: Array<string>;
}

export interface detailsResponseInf {
  film: detailsInf;
}

export interface detailsParams {
  filmId: number;
}

export interface cinemaRequestInf {
  filmId: number;
  cityId: number;
}

export interface cinemaListRequestInf {
  cityId: number;
}

export interface cinemaResponseInf {
  cinemaExtendList: Array<{
    cinemaId: number;
    lowPrice: number;
  }>;
  showCinemas: Array<{
    cinemaList: Array<number>;
    showDate: number;
  }>;
}

export interface cinemaListResponseInf {
  cinemas: Array<cinemasInfoInf>;
}

export type moviceDetailsInf = {
  showDate: Array<string>;
} & detailsInf;

export interface moviceDetailsResponseInf {
  films: Array<moviceDetailsInf>;
}

// 评分
export type rateDetailsResponseImg = Array<number>;

export type rateListDetailsPaginInf = {
  pageSize: number;
  pageNo: number;
  list: Array<rateListDetailsResponseImg>;
};

export type rateListDetailsResponseImg = {
  userInfo: userSimpleInf;
  rate: number;
  estimation: string;
  like: number;
};

export interface cinemaRequestInf {}
