/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
export interface user {
  accountName: string;
  birthday: string;
  gender: 0 | 1;
  hasDefaultAddr: number;
  hasPassword: number;
  hasPayPwd: number;
  headIcon: string;
  mail: string;
  mobile: string;
  nickName: string;
  thirdAccount: Array<string>;
  userId: number;
  balance: number;
  uid: number;
}

export interface userState {
  user: {
    userData: user;
    token: string;
    couponList: Array<cardListInf>;
  };
}

export interface loginRequestInf {
  userId: number;
  password: string;
}

export interface cardListInf {
  couponId: number;
  couponName: string;
  expiration: number;
  remission: number;
  remissions: string;
  descption: string;
  tag: string;
  isExpia: boolean;
}

export interface cardInf {
  cardList: Array<cardListInf>;
}

export interface cardResponseInf {
  data: cardInf;
}

export interface amountInf {
  availableAmount: number;
  frozenAmount: number;
  totalAmount: number;
}

export interface amountResponseInf {
  data: amountInf;
}

export interface userSimpleInf {
  userId: number;
  nickName: string;
  headIcon: string;
}
