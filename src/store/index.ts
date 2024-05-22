import { configureStore } from "@reduxjs/toolkit";

import locationSlice from "./common/location";
import userSlice from "./common/user";
import cinemaSlice from "./common/cinema";

import scheduleSlice from "./schedule";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    user: userSlice,
    location: locationSlice,
    schedule: scheduleSlice,
    cinema: cinemaSlice,
    // user: useSlice,
  },
});

export default store;
