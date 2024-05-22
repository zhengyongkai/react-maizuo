import request from '@/utils/request';
import { MAIZUO, BASE_URL } from '@/constant/baseUrl';
import type { scheduleResponseInf } from '@/types/schedule';
import type { cinemasInfoInf, cinemasInfoResponseInf } from '@/types/cinema';
import type { moviceDetailsResponseInf } from '@/types/movice';
import type { seatingChartInf, seatListInf } from '@/types/seat';
import type { Response } from '@/types';

/**
 * @description: 根据 cinemaId 获取影院详情
 * @param {{cinemaId:number}} params
 * @return {*}
 */
export function getCinemasInfo(params: { cinemaId: number }): Response<cinemasInfoResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.cinema.info'
    },
    params
  });
}

/**
 * @description: 通过 cinemaId 获取当地影院上家电影的信息
 * @return {*}
 */
export function getCinemasShowInfo(params: {
  cinemaId: number;
}): Response<moviceDetailsResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.film.cinema-show-film'
    },
    params
  });
}

/**
 * @description: 通过 filmId , cinemaId , date 获取影院该电影对应天排班信息
 * @return {*}
 */
export function getCinemasSchedule(params: {
  filmId: number | undefined;
  cinemaId: number;
  date: string | undefined;
}): Response<scheduleResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.schedule.list'
    },
    params
  });
}

/**
 * @description: 根据 scheduleId 获取作座位信息
 * @param {object} params
 * @return {*}
 */
export function getCinemasSeat(params: { scheduleId: number }): Response<seatListInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.seat.list'
    },
    params
  });
}
