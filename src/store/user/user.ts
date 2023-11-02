// counterSlice.ts 文件

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "@/pages/api/user";
import { HashRouter } from "react-router-dom";

export interface CounterState {
  value: number;
  title: string;
  user: {};
}
const initialState: CounterState = {
  value: 0,
  title: "redux toolkit pre",
  user: {},
};

const getFakeUserData = () => {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      resolve(await getUserData());
    }, 3000);
  });
};

export const userAsync: any = createAsyncThunk(
  "/user/getUserData",
  async () => {
    return await getFakeUserData();
  }
);

// 创建一个 Slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    getUserData(state) {},
  },
  extraReducers: (builder) => {
    builder.addCase(userAsync.fulfilled, (state, { payload }) => {
      // console.log(state, payload);
      state.user = payload;
    });
  },
});
// 导出加减的方法
// export const { userAsync } = counterSlice.actions;

// 默认导出
export default counterSlice.reducer;
