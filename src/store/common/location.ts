import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getLocationList, getLocation } from '@/api/location';

import { PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT } from '@/constant/geolocation';

import type { initialStateInf } from '@/types/location';
import cookie from '@/utils/cookie';
import { showDialog } from '@/utils/dialog';

const initialState: initialStateInf = {
  locale: {
    name: cookie.getCookie('name'),
    cityId: cookie.getCookie('cityId')
  },
  tude: {
    longitude: 0,
    latitude: 0
  },
  locationList: []
};

/**
 * @description: 通过 navigator.geolocation 获取当前经纬度，通过经纬度去服务器获取地理信息
 * @return {*}
 */
function getGPSPosition() {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      console.log('获取当前地点 ==');
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { data: locale } = await getLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          });
          res({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            locale: locale.city
          });
        },
        async (error: GeolocationPositionError) => {
          let content = '';
          switch (error.code) {
            case PERMISSION_DENIED:
              content = '地理位置信息的获取失败，请开启相关权限';
              break;
            case POSITION_UNAVAILABLE:
              content = '地理位置获取失败，请稍后重试';
              break;
            case TIMEOUT:
              content = '地理位置获取超时';
          }
          rej(error);
          showDialog.show({
            content
          });
        }
      );
    }
  });
}

/**
 * @description: 获取地理位置列表
 * @return {*}
 */
export const getLocationListsAsyc: any = createAsyncThunk('location/getLocationList', async () => {
  return await getLocationList();
});

/**
 * @description: 通过 navigator.geolocation 获取当前经纬度，通过经纬度去服务器获取地理信息
 * @return {*}
 */
export const getLocationAsync: any = createAsyncThunk('location/getLocation', async () => {
  return await getGPSPosition();
});

export const location = createSlice({
  name: 'location',
  initialState,
  reducers: {
    /**
     * @description: 设置地理位置信息
     * @param {*} state
     * @param {*} param2
     * @return {*}
     */
    setLocale(state, { payload }) {
      state.locale = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLocationAsync.fulfilled, (state, { payload }: any) => {
      state.tude.latitude = +payload.latitude;
      state.tude.longitude = +payload.longitude;
      state.locale.name = payload.locale.name;
      state.locale.cityId = payload.locale.cityId;
      cookie.setCookie('name', state.locale.name);
      cookie.setCookie('cityId', state.locale.cityId);
    });
    builder.addCase(
      getLocationListsAsyc.fulfilled,
      (
        state,
        {
          payload: {
            data: { cities }
          }
        }
      ) => {
        state.locationList = cities;
      }
    );
  }
});

export const { setLocale } = location.actions;

export default location.reducer;
