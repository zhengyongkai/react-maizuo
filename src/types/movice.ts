import { districtImf } from '@/types/location';
import { userSimpleImf } from './user';

export interface anctorImf {
  name: string;
  role: string;
  avatarAddress: string;
}

export interface moviceImf {
  filmId: number;
  name: string;
  category: string;
  synopsis: string;
  poster: string;
  grade: string;
  actors: Array<anctorImf>;
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

export interface itemImf {
  name: string;
  type: number;
}

export interface filmTypeImf {
  name: string;
  value: number;
}

export interface detailsImf {
  actors: Array<anctorImf>;
  category: string;
  director: string;
  filmId: number;
  filmType: filmTypeImf;
  isPresale: boolean;
  isSale: boolean;
  item: itemImf;
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

export interface detailsResponseImf {
  film: detailsImf;
}

export interface detailsParams {
  filmId: number;
}

export interface cinemaRequestImf {
  filmId: number;
  cityId: number;
}

export interface cinemaListRequestInf {
  cityId: number;
}

export interface cinemaResponseImf {
  cinemaExtendList: Array<{
    cinemaId: number;
    lowPrice: number;
  }>;
  showCinemas: Array<{
    cinemaList: Array<number>;
    showDate: number;
  }>;
}

export interface chinemaDetailImf {
  Distance: number;
  address: string;
  businessTime: string;
  cinemaId: number;
  cityId: number;
  cityName: string;
  district: districtImf;
  districtId: number;
  districtName: string;
  eTicketFlag: number;
  gpsAddress: string;
  isVisited: number;
  latitude: number;
  logoUrl: string;
  longitude: number;
  lowPrice: number;
  name: string;
  notice: string;
  phone: string;
  seatFlag: number;
  telephones: Array<string>;
  ticketTypes: number;
}

export interface cinemaListResponseImf {
  cinemas: Array<chinemaDetailImf>;
}

export type moviceDetailsImf = {
  showDate: Array<string>;
} & detailsImf;

export interface moviceDetailsResponseImf {
  films: Array<moviceDetailsImf>;
}

// 评分
export type rateDetailsResponseImg = Array<number>;

export type rateListDetailsPaginImf = {
  pageSize: number;
  pageNo: number;
  list: Array<rateListDetailsResponseImg>;
};

export type rateListDetailsResponseImg = {
  userInfo: userSimpleImf;
  rate: number;
  estimation: string;
  like: number;
};

export interface cinemaRequestImf {}
