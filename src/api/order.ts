import { BASE_URL } from '@/constant/baseUrl';
import type { preOrderEntity, preOrderParams } from '@/types/order';
import type { OReseponse, Response } from '@/types';

import request from '@/utils/request';

/**
 * @description: 生成订单
 * @param {preOrderParams} data
 * @return {*}
 */
export function generatePreOrder(data: preOrderParams): OReseponse {
  return request.post(`${BASE_URL}/order/addOrder`, data);
}

/**
 * @description: 根据订单Id获取对应订单
 * @param {number} orderId
 * @return {*}
 */
export function getOrderById(orderId: number): Response<preOrderEntity> {
  return request.get(`${BASE_URL}/order/getOrderById?orderId=${orderId}`);
}

/**
 * @description: 获取用户的订单
 * @return {*}
 */
export function getOrderByUser(): Response<preOrderEntity[]> {
  return request.get(`${BASE_URL}/order/getOrderByUserId`);
}

/**
 * @description: 订单支付接口
 * @return {*}
 */
export function payOrder(data: {
  oNum: string;
  price: number;
  subject: string;
  orderId: number;
}): Response<string> {
  return request.post(`${BASE_URL}/order/payOrder`, data);
}

/**
 * @description: 请求订单查看是否完成支付 （跳转后请求）
 * @param {object} data
 * @return {*}
 */
export function queryOrder(data: { out_trade_no: string; trade_no: string }): Response<string> {
  return request.post(`${BASE_URL}/order/queryOrder`, data);
}

/**
 * @description: 完成支付
 * @param {object} data
 * @return {*}
 */
export function finishOrder(data: { actualPrice: number; orderId: number }) {
  return request.post(`${BASE_URL}/order/finishOrder`, data);
}
