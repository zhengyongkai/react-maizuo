/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { BASE_URL } from "@/constant/baseUrl";
import type { OReseponse, Response } from "@/types";
import type { cardInf, loginRequestInf } from "@/types/user";
import request from "@/utils/request";

export const getUserData = () => {
  return request.get(`${BASE_URL}/user/getInfo`);
};

export const login = (data: loginRequestInf) => {
  return request.post(`${BASE_URL}/user/login`, data);
};

export const loginByGithub = (code: string) => {
  return request.post(`${BASE_URL}/user/github/login`, {
    code,
  });
};

export const getCardList = (): Response<cardInf> => {
  return request.get(`${BASE_URL}/user-coupon/getInfo`);
};

export const uploadUserHeadIcon = (file: FormData): OReseponse => {
  return request.post(`${BASE_URL}/user/upload-head-icon`, file);
};
