import request from "@/utils/request";
import { MAIZUO } from "@/constant/baseUrl";

export function getLocationList() {
  return request.get(`${MAIZUO}`, {
    headers: {
      "X-Host": "mall.film-ticket.city.list",
    },
  });
}

export function getLocation(params: { longitude: number; latitude: number }) {
  return request.get(`${MAIZUO}`, {
    headers: {
      "X-Host": "mall.film-ticket.city.locate",
    },
    params,
  });
}
