/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import request from "@/utils/request";
import type {
  cinemaListRequestInf,
  cinemaListResponseInf,
  cinemaRequestInf,
  detailsInf,
  detailsParams,
  detailsResponseInf,
  moviceParams,
  rateDetailsResponseImg,
  rateListDetailsPaginInf,
  rateListDetailsResponseImg,
} from "@/types/movice";
import { MAIZUO, MOCK } from "@/constant/baseUrl";

import type { Response, ResponsePageSize } from "@/types";

export function getMoviceData(params: moviceParams) {
  const cityId = params.cityId === -1 ? 110100 : params.cityId;
  return request.get(`${MAIZUO}?type=1&k=1039533`, {
    params: {
      ...params,
      cityId,
    },
  });
}

export function getMoviceComingData(params: moviceParams) {
  const cityId = params.cityId === -1 ? 110100 : params.cityId;
  return request.get(`${MAIZUO}?cityId=110100&type=2&k=2724448`, {
    params: {
      ...params,
      cityId,
    },
  });
}

export function getMoviceDetail(
  params: detailsParams
): Response<detailsResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      "X-Host": "mall.film-ticket.film.info",
    },
    params,
  });
}

export function getCinemas(params: cinemaRequestInf) {
  return request.get(`${MAIZUO}`, {
    headers: {
      "X-Host": "mall.film-ticket.cinema.film-show-cinema",
    },
    params,
  });
}

export function getCinemasList(data: {
  cityId: number;
  cinemaIds: string;
}): Response<cinemaListResponseInf> {
  return request.post(`${MAIZUO}`, data, {
    headers: {
      "X-Host": "mall.film-ticket.cinema.batch-cinema",
      "Content-Type": "application/x-www-form-urlencode",
    },
  });
}

export function getCinemasByCityId(params: {
  cityId: number;
  ticketFlag: number;
}): Response<cinemaListResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      "X-Host": "mall.film-ticket.cinema.list",
    },
    params,
  });
}

export function getRateForChinema(params: {
  filmId: number;
}): Response<rateDetailsResponseImg> {
  return request.get(`${MOCK}/api/getRate`, { params });
}

export function getRateListForCinema(params: {
  pageNo: number;
  pageSize: number;
}): ResponsePageSize<rateListDetailsResponseImg> {
  // console.log(params);
  return request.get(`${MOCK}/api/getRateList`, { params });
}
