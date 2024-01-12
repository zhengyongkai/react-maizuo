import { BASE_URL } from "@/constant/baseUrl";
import type { preOrderEntity, preOrderParams } from "@/types/order";
import type { OReseponse, Response } from "@/types";

import request from "@/utils/request";

export function generatePreOrder(data: preOrderParams): OReseponse {
  return request.post(`${BASE_URL}/order/addOrder`, data);
}

export function getOrderById(orderId: number): Response<preOrderEntity> {
  return request.get(`${BASE_URL}/order/getOrderById?orderId=${orderId}`);
}

export function getOrderByUser(): Response<preOrderEntity[]> {
  return request.get(`${BASE_URL}/order/getOrderByUserId`);
}

export function payOrder(data: {
  oNum: string;
  price: number;
  subject: string;
  orderId: number;
}): Response<string> {
  return request.post(`${BASE_URL}/order/payOrder`, data);
}
export function queryOrder(data: {
  out_trade_no: string;
  trade_no: string;
}): Response<string> {
  return request.post(`${BASE_URL}/order/queryOrder`, data);
}

export function finishOrder(data: { actualPrice: number; orderId: number }) {
  return request.post(`${BASE_URL}/order/finishOrder`, data);
}
