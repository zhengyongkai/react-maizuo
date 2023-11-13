import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showDialog } from '@/pages/utils/dialog';
import { getLocationList, getLocation } from '@/pages/api/location';

import {
  PERMISSION_DENIED,
  POSITION_UNAVAILABLE,
  TIMEOUT,
} from '@/pages/constant/geolocation';
import { getAddress } from '@/pages/utils/location';

import type { locationResultImf, initialStateImf } from '@/types/location';
import cookie from '@/pages/utils/cookie';

const initialState: initialStateImf = {
  locale: {
    name: cookie.getCookie('name'),
    cityId: cookie.getCookie('cityId') || -1,
  },
  tude: {
    longitude: 0,
    latitude: 0,
  },
  locationList: [],
};

function getGPSPosition() {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      console.log('获取当前地点 ==');
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const result: locationResultImf = (await getAddress(
            position.coords.longitude,
            position.coords.latitude
          )) as locationResultImf;
          const { data: locale } = await getLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
          // console.log(locale);
          res({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            locale: locale.city,
          });
        },
        (error: GeolocationPositionError) => {
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
          // showDialog.show({
          //   content,
          // });
        }
      );
    }
  });
}

export const getLocationListsAsyc: any = createAsyncThunk(
  'location/getLocationList',
  async () => {
    return await getLocationList();
  }
);

export const getLocationAsync: any = createAsyncThunk(
  'location/getLocation',
  async () => {
    return await getGPSPosition();
  }
);

export const location = createSlice({
  name: 'location',
  initialState,
  reducers: {
    // 设置地区
    setLocale(state, { payload }) {
      console.log(payload);
      state.locale = payload;
    },
    getGeoLocale() {},
  },
  extraReducers: (builder) => {
    builder.addCase(getLocationAsync.fulfilled, (state, { payload }: any) => {
      state.tude.latitude = payload.latitude as number;
      state.tude.longitude = payload.longitude as number;
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
            data: { cities },
          },
        }
      ) => {
        state.locationList = cities;
      }
    );
  },
});

export const { setLocale } = location.actions;

export default location.reducer;
