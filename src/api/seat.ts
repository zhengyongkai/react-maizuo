import request from '@/utils/request';
import { MAIZUO } from '@/constant/baseUrl';
import type { Response } from '@/types';
import type { seatResponseInf } from '@/types/seat';

/**
 * @description: 获取位置详情信息
 * @param {params:{  scheduleId: number}} params
 * @return {*}
 */
export function getSeatDetails(params: { scheduleId: number }): Response<seatResponseInf> {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.schedule.info'
    },
    params
  });
}
