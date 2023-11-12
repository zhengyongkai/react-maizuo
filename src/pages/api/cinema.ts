import request from '@/pages/utils/request';
import { MAIZUO } from '../constant/baseUrl';

export function getCinemasInfo(params) {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.cinema.info',
    },
    params,
  });
}

export function getCinemasShowInfo(params) {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.film.cinema-show-film',
    },
    params,
  });
}

export function getCinemasSchedule(params) {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.schedule.list',
    },
    params,
  });
}
