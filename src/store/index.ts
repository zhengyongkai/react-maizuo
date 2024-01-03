import { configureStore } from "@reduxjs/toolkit";

import locationSlice from "./common/location";
import userSlice from "./common/user";
import scheduleSlice from "./schedule";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    user: userSlice,
    location: locationSlice,
    schedule: scheduleSlice,
    // user: useSlice,
  },
});

export default store;
