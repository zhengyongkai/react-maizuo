import request from '@/pages/utils/request';
import { MAIZUO, BASE_URL } from '../constant/baseUrl';
import { scheduleResponseImf } from '../types/schedule';
import { cinemasInfoImf, cinemasInfoResponseImf } from '../types/cinema';
import { moviceDetailsResponseImf } from '../types/movice';
import { AxiosResponse } from 'axios';
import { seatingChartInf, seatListInf } from '../types/seat';
import { Response } from '../types';

export function getCinemasInfo(params: {
  cinemaId: string;
}): Response<cinemasInfoResponseImf> {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.cinema.info',
    },
    params,
  });
}

export function getCinemasShowInfo(params: {
  cinemaId: string;
}): Response<moviceDetailsResponseImf> {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.film.cinema-show-film',
    },
    params,
  });
}

export function getCinemasSchedule(params: {
  filmId: number;
  cinemaId: number;
  date: string | undefined;
}): Response<scheduleResponseImf> {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.schedule.list',
    },
    params,
  });
}

export function getCinemasSeat(params: {
  scheduleId: number;
}): Response<seatListInf> {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.seat.list',
    },
    params,
  });
}
