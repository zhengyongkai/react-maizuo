import type { districtInf } from '@/types/location';
import { userSimpleInf } from './user';
import { cinemasInfoInf } from './cinema';

/**
 * @description: 演员信息
 * @param {string} name 演员名称
 * @param {string} role 职位（主演）
 * @param {string} avatarAddress 头像地址
 * @return {*}
 */
export interface anctorInf {
  name: string;
  role: string;
  avatarAddress: string;
}

/**
 * @description: 电影信息
 * @param {number} filmId 电影Id
 * @param {string} name 电影名称
 * @param {string} category 简介
 * @param {string} poster 海报
 * @param {string} grade 评分
 * @param {Array<anctorInf>} actors 主演列表
 * @param {string} nation 国家
 * @param {string} language 语言
 * @return {*}
 */
export interface moviceInf {
  filmId: number;
  name: string;
  category: string;
  synopsis: string;
  poster: string;
  grade: number;
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

export interface detailsInf extends moviceInf {
  director: string;
  filmType: filmTypeInf;
  isPresale: boolean;
  isSale: boolean;
  item: itemInf;
  photos: Array<string>;
  premiereAt: number;
  runtime: number;
  timeType: number;
  videoId: string;
  showDate?: Array<string>;
}

export interface detailsResponseInf {
  film: detailsInf;
}

/**
 * @description: 电影详情查询参数
 * @param {number} filmId 电影 Id
 */
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

/**
 * @description: 评分返回数据类型
 * @return {*}
 */
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
