/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { Toast } from 'antd-mobile';
import axios from 'axios';
import store from '@/store';
import { clearUserData } from '@/store/common/user';

// import { createHashHistory } from "history";
import cookie from './cookie';
axios.interceptors.request.use((requestConfig) => {
  requestConfig.headers['X-Client-Info'] =
    requestConfig.headers['X-Client-Info'] ??
    '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"110100"}';
  requestConfig.headers['X-Host'] =
    requestConfig.headers['X-Host'] ?? 'mall.film-ticket.film.list';
  requestConfig.headers['X-Requested-With'] =
    requestConfig.headers['X-Requested-With'] ?? 'XMLHttpRequest';
  requestConfig.headers['X-Token'] = cookie.getCookie('x-Token');
  return requestConfig;
});

axios.interceptors.response.use((response) => {
  //   location.href = "/#/login";
  switch (response.data.status) {
    case 500:
      Toast.show(response.data.msg);
      return Promise.reject(response.data.msg);
    case 401:
      store.dispatch(clearUserData());
      return Promise.reject(response.data.msg);
  }
  return response.data;
});

export default axios;
