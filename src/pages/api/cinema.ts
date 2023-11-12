import request from '@/pages/utils/request';
import { MAIZUO } from '../constant/baseUrl';
import { scheduleResponseImf } from '../types/schedule';
import { cinemasInfoResponseImf } from '../types/cinema';
import { moviceDetailsResponseImf } from '../types/movice';

export function getCinemasInfo(params): Promise<cinemasInfoResponseImf> {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.cinema.info',
    },
    params,
  });
}

export function getCinemasShowInfo(params): Promise<moviceDetailsResponseImf> {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.film.cinema-show-film',
    },
    params,
  });
}

export function getCinemasSchedule(params): Promise<scheduleResponseImf> {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      'X-Host': 'mall.film-ticket.schedule.list',
    },
    params,
  });
}
