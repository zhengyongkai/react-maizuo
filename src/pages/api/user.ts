import { MAIZUO } from '../constant/baseUrl';
import { Response } from '../types';
import {
  amountResponseInf,
  cardResponseInf,
  loginRequestInf,
} from '../types/user';
import request from '../utils/request';

// export const getUserData = () => {
//   return request.get("/user.json");
// };

export const getUserData = () => {
  return request.get(`${MAIZUO}?k=5840910`, {
    headers: {
      'X-Host': 'mall.user.info.get',
      'X-Client-Info':
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"340800"}',
    },
  });
};

export const login = (data: loginRequestInf) => {
  return request.post(`${MAIZUO}?k=5840910`, data, {
    headers: {
      'X-Host': 'mall.user.sms-code-login',
      'X-Client-Info':
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"340800"}',
    },
  });
};

export const getCardList = (): Response<cardResponseInf> => {
  return request.get(`${MAIZUO}?k=5840910`, {
    headers: {
      'X-Host': 'mall.user.page.data',
      'X-Client-Info':
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"340800"}',
    },
  });
};

export const getCardAmount = (): Response<amountResponseInf> => {
  return request.get(`${MAIZUO}?k=5840910`, {
    headers: {
      'X-Host': 'mall.asset.balance.info',
      'X-Client-Info':
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"340800"}',
    },
  });
};
