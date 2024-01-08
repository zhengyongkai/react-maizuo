import request from '@/utils/request';
import { MAIZUO } from '@/constant/baseUrl';
import type { Response } from '@/types';
import type { seatRequestParamsInf, seatResponseInf } from '@/types/seat';

export function getSeatDetails(
  params: seatRequestParamsInf
): Response<seatResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.schedule.info',
    },
    params,
  });
}
