/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import request from "@/pages/utils/request";
import type {
  cinemaRequestImf,
  detailsImf,
  detailsParams,
  detailsResponseImf,
  moviceParams,
  rateDetailsResponseImg,
  rateListDetailsPaginImf,
  rateListDetailsResponseImg,
} from "@/pages/types/movice";
import { MAIZUO, MOCK } from "@/pages/constant/baseUrl";
import { AxiosResponse } from "axios";
import { Response, ResponsePageSize } from "../types";

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
): Response<detailsResponseImf> {
  return request.get(`${MAIZUO}?k=5840910`, {
    headers: {
      "X-Host": "mall.film-ticket.film.info",

      "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"340800"}',
    },
    params,
  });
}

export function getCinemas(params: cinemaRequestImf) {
  return request.get(`${MAIZUO}?k=1064483`, {
    headers: {
      "X-Host": "mall.film-ticket.cinema.film-show-cinema",

      "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"110100"}',
    },
    params,
  });
}

export function getCinemasList(data) {
  return request.post(`${MAIZUO}`, data, {
    headers: {
      "X-Host": "mall.film-ticket.cinema.batch-cinema",
      "Content-Type": "application/x-www-form-urlencode",
      "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"110100"}',
    },
  });
}

export function getRateForChinema(params): Response<rateDetailsResponseImg> {
  return request.get(`${MOCK}/api/getRate`, params);
}

export function getRateListForCinema(
  params
): ResponsePageSize<rateListDetailsResponseImg> {
  // console.log(params);
  return request.get(`${MOCK}/api/getRateList`, { params });
}
