import { AnyAction } from "@reduxjs/toolkit";
import { INCREMENT, DECREMENT } from "../constants";
// 初始化状态
const initState = 0;

export default function count(preState = initState, action: AnyAction) {
  const { type, data } = action;
  switch (type) {
    case INCREMENT:
      return preState + data;
    case DECREMENT:
      return preState - data;
    default:
      return preState;
  }
}
