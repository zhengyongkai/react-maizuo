/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content:
 */
import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import BaseLayout from '@/page/layout/baseLayout';
import Login from '@/page/login/login';
import Location from '@/page/location/location';
import HomePage from '@/page/layout/homeLayout';
import NewsPage from '@/page/news/news';
import MyPage from '@/page/my/my';
import ComingSoon from '@/page/home/comingSoon';
import NowPlaying from '@/page/home/nowPlaying';
import FilmPage from '@/page/films/films';
import CinemasPage from '@/page/cinema/index';
import Map from '@/page/cinema/map';
import SeatPage from '@/page/movice/seat';
import RatePage from '@/page/movice/rate';
import OrderPage from '@/page/order/order';
import PreOrderPage from '@/page/order/orderPre';
import CouponPage from '@/page/my/coupon';
import CustomPage from '@/page/my/custom';

import CinemasInfo from '@/page/movice/schedule';
import { Navigate } from 'react-router-dom';
import OrderInfoPage from '@/page/order/orderInfo';
import SettingPage from '@/page/my/setting';

export interface RouteObjectInf {
  path: string;
  element: React.ReactNode;
  meta?: {
    login?: boolean;
    keepAlive?: boolean;
    locate?: boolean;
  };
  children?: RouteObjectInf[];
}

const Router: RouteObjectInf[] = [
  {
    path: '*',
    element: <Navigate to={'/name/home/nowPlaying'}></Navigate>,
  },
  {
    path: 'login',
    element: <Login></Login>,
  },
  {
    path: '/location',
    element: <Location />,
  },
  {
    path: '/name/',
    element: <BaseLayout />,
    children: [
      {
        path: '/name/home',
        element: <HomePage />,
        meta: {
          locate: true,
        },
        children: [
          {
            path: '/name/home/nowPlaying',
            element: <NowPlaying />,
            meta: {
              keepAlive: true,
            },
          },
          {
            path: '/name/home/comingSoon',
            element: <ComingSoon />,
            meta: {
              keepAlive: true,
            },
          },
        ],
      },
      {
        path: 'news',
        element: <NewsPage />,
        meta: {
          keepAlive: true,
          locate: true,
        },
      },
      {
        path: 'my',
        element: <MyPage />,
        meta: {
          keepAlive: true,
        },
      },
    ],
  },

  {
    path: '/films/:id',
    element: <FilmPage />,
  },
  {
    path: '/films/cinemas/:id',
    element: <CinemasPage />,
    meta: {
      locate: true,
    },
  },
  {
    path: '/films/chinemasInfo/:cinemaId/:filmId/:showDate',
    element: <CinemasInfo />,
    meta: {
      locate: true,
    },
  },
  {
    path: 'map/:lng/:lat',
    element: <Map />,
  },
  {
    path: 'seat/:id/:showDate',
    element: <SeatPage></SeatPage>,
    meta: {
      login: true,
    },
  },
  {
    path: 'rate/:filmId',

    element: <RatePage />,
  },
  {
    path: 'coupon',
    element: <CouponPage />,
    meta: {
      login: true,
    },
  },
  {
    path: 'setting',
    element: <SettingPage />,
    meta: {
      login: true,
    },
  },
  {
    path: 'preOrder/:id',
    element: <PreOrderPage />,
    meta: {
      login: true,
    },
  },
  {
    path: 'order',
    element: <OrderPage />,
    meta: {
      login: true,
    },
  },
  {
    path: 'orderInfo/:id',
    element: <OrderInfoPage />,
    meta: {
      login: true,
    },
  },
  {
    path: 'custom',
    element: <CustomPage />,
    meta: {
      login: true,
    },
  },
];

export default Router;
