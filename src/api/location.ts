import request from '@/utils/request';
import { MAIZUO } from '@/constant/baseUrl';

/**
 * @description: 获取所有城市信息
 * @return {*}
 */
export function getLocationList() {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.city.list'
    }
  });
}

/**
 * @description:
 * @param {{ longitude: number; latitude: number}} params 根据经纬度获取城市信息
 * @return {*}
 */
export function getLocation(params: { longitude: number; latitude: number }) {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.film-ticket.city.locate'
    },
    params
  });
}
