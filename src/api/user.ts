/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { BASE_URL, MAIZUO } from '@/constant/baseUrl';
import type { Response } from '@/types';
import type { amountInf, cardInf, loginRequestInf } from '@/types/user';
import request from '@/utils/request';

// export const getUserData = () => {
//   return request.get("/user.json");
// };

export const getUserData = () => {
  return request.get(`${BASE_URL}/user/getInfo`, {
    headers: {
      'X-Host': 'mall.user.info.get',
    },
  });
};

export const login = (data: loginRequestInf) => {
  return request.post(`${BASE_URL}/user/login`, data, {
    headers: {
      'X-Host': 'mall.user.sms-code-login',
    },
  });
};

export const getCardList = (): Response<cardInf> => {
  return request.get(`${BASE_URL}/user-coupon/getInfo`);
};

export const getCardAmount = (): Response<amountInf> => {
  return request.get(`${MAIZUO}`, {
    headers: {
      'X-Host': 'mall.asset.balance.info',
    },
  });
};
