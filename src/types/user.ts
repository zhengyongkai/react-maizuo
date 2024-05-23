/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: user typescript 定义
 */


/**
 * @description: 用户信息
 * @param {string} accountName 账户名称
 * @param {string} birthday 生日
 * @param {0 | 1} gender 性别
 * @param {number} hasDefaultAddr 是否永远默认地址
 * @param {number} hasPassword 是否拥有默认密码
 * @param {string} headIcon 头像
 * @param {string} mail 邮箱
 * @param {string} mobile 电话号码
 * @param {string} nickName 昵称
 * @param {Array<string>} thirdAccount 第三方账号
 * @param {number} userId userId
 * @param {number} balance 余额
 * @param {number} uid uid 
 * @return {*}
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

/**
 * @description: 用户store类型 (用户信息，用户token，用户优惠券)
 * @param {user:{userData:user,token:string,couponList:Array<cardListInf>}}
 * @return {*}
 */
export interface userState {
  user: {
    userData: user;
    token: string;
    couponList: Array<cardListInf>;
  };
}


/**
 * @description: 优惠券信息
 * @param {number} couponId 优惠券ID
 * @param {string} couponName 优惠券名称
 * @param {number} expiration 过期时间
 * @param {string} descption 描述
 * @param {string} tag 标签
 * @param {boolean} isExpia 是否过期
 * @return {*}
 */
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

/**
 * @description: 优惠券列表
 * @return {*}
 */
export interface cardInf {
  cardList: Array<cardListInf>;
}

/**
 * @description: 优惠券相应类型
 * @return {*}
 */
export interface cardResponseInf {
  data: cardInf;
}

export interface amountInf {
  availableAmount: number;
  frozenAmount: number;
  totalAmount: number;
}

/**
 * @description: 账户相应类型
 * @return {*}
 */
export interface amountResponseInf {
  data: amountInf;
}


export interface userSimpleInf {
  userId: number;
  nickName: string;
  headIcon: string;
}
