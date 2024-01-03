/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: 用户选择座位 reducers
 */
import { seatsInf } from "@/types/seat";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  selectSeats: Array<seatsInf>;
}

const initialState: initialStateProps = {
  selectSeats: [],
};

export const scheduleStore = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSeats(state, { payload }) {
      state.selectSeats = payload;
    },
    clearSeats(state) {
      state.selectSeats = [];
    },
  },
  extraReducers: {},
});

export const { setSeats, clearSeats } = scheduleStore.actions;

export default scheduleStore.reducer;
