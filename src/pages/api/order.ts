import { BASE_URL, MAIZUO } from "../constant/baseUrl";
import { preOrderParams } from "../types/order";
import request from "@/pages/utils/request";
import { OReseponse, Response } from "../types";

export function generatePreOrder(data: preOrderParams): OReseponse {
  return request.post(`${BASE_URL}/order/addOrder`, data);
}

export function getOrderById(orderId: number): Response<preOrderParams> {
  return request.get(`${BASE_URL}/order/getOrderById?orderId=${orderId}`);
}
