import { getUserData } from "@/pages/api/user";
import { user } from "@/pages/types/user";
import cookie from "@/pages/utils/cookie";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOKEN } from "../constants";

export interface initUserStoreInf {
  userData: user;
  logged: boolean;
  token: string;
}

// export function getUserData() {}

export const getUserDataThunk: any = createAsyncThunk(
  "/user/getData",
  async () => {
    return await getUserData();
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
  },
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
      console.log(state.userData, state.token);
    },
    clearUserData(state) {
      state.logged = false;
      state.userData.userId = 0;
      cookie.removeCookie(TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDataThunk.fulfilled, (state, { payload }) => {
      state.userData = payload.data;
      state.logged = true;

      // console.log(state.userData);
    });
  },
});

export const { setUserData, clearUserData } = userStore.actions;

export default userStore.reducer;
