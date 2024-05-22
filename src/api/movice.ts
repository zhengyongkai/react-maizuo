/*
 * @Author: 郑永楷
 * @LastEditors: zhengyongkai 825947557@qq.com
 * @Description: file content
 */
import request from '@/utils/request';
import type {
  cinemaListRequestInf,
  cinemaListResponseInf,
  cinemaRequestInf,
  cinemaResponseInf,
  detailsInf,
  detailsParams,
  detailsResponseInf,
  moviceParams,
  rateDetailsResponseImg,
  rateListDetailsResponseImg
} from '@/types/movice';
import { MAIZUO, MOCK } from '@/constant/baseUrl';

import type { Response, ResponsePageSize } from '@/types';

/**
 * @description: 获取电影列表接口
 * @param {moviceParams} params 查询信息
 * @return {*}
 */
export function getMoviceData(params: moviceParams) {
  const cityId = params.cityId === -1 ? 110100 : params.cityId;
  return request.get(`${MAIZUO}?type=1&k=1039533`, {
    params: {
      ...params,
      cityId
    }
  });
}

/**
 * @description: 查询即将上映的电影
 * @param {moviceParams} params
 * @return {*}
 */
export function getMoviceComingData(params: moviceParams) {
  const cityId = params.cityId === -1 ? 110100 : params.cityId;
  return request.get(`${MAIZUO}?type=2&k=2724448`, {
    params: {
      ...params,
      cityId
    }
  });
}

/**
 * @description: 根据 filmId  查询电影详情
 * @param {detailsParams} params
 * @return {*}
 */
export function getMoviceDetail(params: detailsParams): Response<detailsResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.film.info'
    },
    params
  });
}

/**
 * @description: 根据 filmId 和 cityId 查询所有电影列表以及城市与电影对应情况
 * @param {cinemaRequestInf} params
 * @return {*}
 */
export function getCinemas(params: cinemaRequestInf): Response<cinemaResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.cinema.film-show-cinema'
    },
    params
  });
}

/**
 * @description: 根据 cityId 和 cinemaIds 查询所有电影
 * @return {*}
 */
export function getCinemasList(data: {
  cityId: number;
  cinemaIds: string;
}): Response<cinemaListResponseInf> {
  return request.post(`${MAIZUO}`, data, {
    headers: {
      'X-Host': 'mall.film-ticket.cinema.batch-cinema',
      'Content-Type': 'application/x-www-form-urlencode'
    }
  });
}

/**
 * @description: 根据 cityId 和 ticketFlag 查询城市所有电影
 * @return {*}
 */
export function getCinemasByCityId(params: {
  cityId: number;
  ticketFlag?: number;
}): Response<cinemaListResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.cinema.list'
    },
    params
  });
}

/**
 * @description: 根据filmId 查询电影的评分
 * @param {{ filmId: number }} params
 * @return {*}
 */
export function getRateForChinema(params: { filmId: number }): Response<rateDetailsResponseImg> {
  return request.get(`${MOCK}/api/getRate`, { params });
}

/**
 * @description: 根据 pageNo 和 pageSize 查询电影的评论
 * @param {{pageNo:number,pageSize:number}}
 * @return {*}
 */
export function getRateListForCinema(params: {
  pageNo: number;
  pageSize: number;
}): ResponsePageSize<rateListDetailsResponseImg> {
  // console.log(params);
  return request.get(`${MOCK}/api/getRateList`, { params });
}
