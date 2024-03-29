/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { getCardList, getUserData } from "@/api/user";

import cookie from "@/utils/cookie";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOKEN } from "../../constant";

import type { cardListInf, user } from "@/types/user";
import socketIo from "@/utils/socket";

export interface initUserStoreInf {
  userData: user;
  logged: boolean;
  token: string;
  couponList: cardListInf[];
}

// export function getUserData() {}
// 获取用户信息
export const getUserDataThunk: any = createAsyncThunk(
  "/user/getData",
  async () => {
    return await getUserData();
  }
);
// 获取优惠券信息
export const getUserCouponThunk: any = createAsyncThunk(
  "/user/getCoupon",
  async () => {
    return await getCardList();
  }
);

const initUserStore: initUserStoreInf = {
  userData: {
    accountName: "",
    birthday: "",
    gender: 0,
    hasDefaultAddr: 0,
    hasPassword: 0,
    hasPayPwd: 0,
    headIcon: "",
    mail: "",
    mobile: "",
    nickName: "",
    thirdAccount: [],
    userId: 0,
    balance: 0,
    uid: 0,
  },
  couponList: [],
  logged: false,
  token: cookie.getCookie(TOKEN),
};

export const userStore = createSlice({
  name: "user",
  initialState: initUserStore,
  reducers: {
    setUserData(state, payload) {
      state.userData = payload.payload;
      state.token = payload.payload.token;
      cookie.setCookie(TOKEN, payload.payload.token);
    },
    clearUserData(state) {
      state.logged = false;
      state.userData.userId = 0;
      state.userData.balance = 0;
      state.token = "";
      state.couponList = [];
      socketIo.disconnect();
      cookie.removeCookie(TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDataThunk.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.userData = payload.data;
        state.logged = true;
      }
    });
    builder.addCase(getUserCouponThunk.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.couponList = payload.data;
      }
    });
  },
});

export const { setUserData, clearUserData } = userStore.actions;

export default userStore.reducer;
