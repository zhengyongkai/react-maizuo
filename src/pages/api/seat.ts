import request from "@/pages/utils/request";
import { AxiosPromise, AxiosResponse } from "axios";
import { MAIZUO } from "../constant/baseUrl";
import { Response } from "../types";
import { seatRequestParamsInf, seatResponseInf } from "../types/seat";

export function getSeatDetails(
  params: seatRequestParamsInf
): Response<seatResponseInf> {
  return request.get(`${MAIZUO}?k=564058`, {
    headers: {
      "X-Host": "mall.film-ticket.schedule.info",
    },
    params,
  });
}
