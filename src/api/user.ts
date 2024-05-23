/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { BASE_URL } from '@/constant/baseUrl';
import type { OReseponse, Response } from '@/types';
import type { cardInf } from '@/types/user';
import request from '@/utils/request';

/**
 * @description: 获取座位信息
 * @return {*}
 */
export const getUserData = () => {
  return request.get(`${BASE_URL}/user/getInfo`);
};

/**
 * @description: 登录接口
 * @param {{userId:number,password:string}} data 用户信息（userId,password）
 * @return {*}
 */
export const login = (data: {  userId: number;
  password: string}) => {
  return request.post(`${BASE_URL}/user/login`, data);
};

/**
 * @description: 第三方Github登录接口
 * @param {string} code
 * @return {*}
 */
export const loginByGithub = (code: string) => {
  return request.post(`${BASE_URL}/user/github/login`, {
    code
  });
};

/**
 * @description: 获取优惠卷
 * @return {*}
 */
export const getCardList = (): Response<cardInf> => {
  return request.get(`${BASE_URL}/user-coupon/getInfo`);
};

/**
 * @description: 上传我的头像
 * @param {FormData} file
 * @return {*}
 */
export const uploadUserHeadIcon = (file: FormData): OReseponse => {
  return request.post(`${BASE_URL}/user/upload-head-icon`, file);
};
