import request from "@/pages/utils/request";
import type { moviceParams } from "@/pages/types/movice";
import { MAIZUO } from "@/pages/constant/baseUrl";

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

export function getMoviceDetail(params) {
  return request.get(`${MAIZUO}?k=5840910`, {
    headers: {
      "X-Host": "mall.film-ticket.film.info",

      "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"340800"}',
    },
    params,
  });
}
