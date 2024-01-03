import { Toast } from "antd-mobile";
import axios from "axios";
import { clearUserData } from "@/store/common/user";

import cookie from "./cookie";
import store from "@/store/index";
import {
  X_CLIENT_INFO,
  X_HOST,
  X_Requested_With,
} from "@/store/constants/header";
import { TOKEN } from "@/store/constants";

axios.interceptors.request.use((requestConfig) => {
  requestConfig.headers["X-Client-Info"] =
    requestConfig.headers["X-Client-Info"] ?? X_CLIENT_INFO;
  requestConfig.headers["X-Host"] = requestConfig.headers["X-Host"] ?? X_HOST;
  requestConfig.headers["X-Requested-With"] =
    requestConfig.headers["X-Requested-With"] ?? X_Requested_With;
  requestConfig.headers["X-Token"] = cookie.getCookie(TOKEN);
  return requestConfig;
});

axios.interceptors.response.use(
  (response) => {
    switch (response.data.status) {
      case 500:
        Toast.show(response.data.msg);
        return Promise.reject(response.data.msg);
      case 401:
        store.dispatch(clearUserData());
        return Promise.reject(response.data.msg);
    }
    return response.data;
  },
  (err) => {
    Toast.show("网络出现异常");
    return Promise.reject(err);
  }
);

export default axios;
