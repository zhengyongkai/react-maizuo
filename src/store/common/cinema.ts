import { createSlice } from "@reduxjs/toolkit";

import { initialStateInf } from "@/types/cinema";

const initialState: initialStateInf = {
  cinemaList: [],
};

export const cinema = createSlice({
  name: "location",
  initialState,
  reducers: {
    // 设置地区
    setCinemaList(state, { payload }) {
      state.cinemaList = payload;
    },
  },
});

export const { setCinemaList } = cinema.actions;

export default cinema.reducer;
