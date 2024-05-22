import { preOrderEntity } from "./order";

export type messageInf = textInf | selectedInf | orderInf;

/**
 * @description: 聊天下拉类型
 * @param title 标题
 * @param url 跳转链接
 * @param id 聊天项的Id
 */
export type selectItemsInf = {
  title: string;
  url: string;
  id: string;
};

/**
 * @description: 聊天普通类型
 * @param fromId 发送者的Id
 * @param from 发送者的名称
 * @param fromMy 发送者是否是我自己
 * @param id 聊天项的Id
 * @param title 标题
 * @param 日期
 */
export type commonInf = {
  fromId: number;
  from: string;
  fromMy?: boolean;
  id: string | null;
  title: string;
  date: string;
};

/**
 * @description: 聊天订单类型
 * @param commonInf 基本类型
 */
export type orderInf = {
  type: "order";
  data: preOrderEntity;
} & commonInf;



/**
 * @description: 普通文字类型
 * @param commonInf 基本类型
 */
export type textInf = {
  type: "text";
  data: [];
} & commonInf;



/**
 * @description: 选择框类型类型
 * @param commonInf 基本类型
 */
export type selectedInf = {
  type: "selected";
  data: selectListInf;
} & commonInf;

export type selectListInf = Array<selectItemsInf>;
