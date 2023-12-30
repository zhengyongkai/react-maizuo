import { Routes, Route, Navigate } from 'react-router-dom';
import RouterPage1 from './components/routerPage1';
import HomePage from './components/home';
import NewsPage from './components/news';
import MyPage from './components/my';
import Login from './components/login';
import Location from './components/location';
import ComingSoon from './comingSoon';
import NowPlaying from './nowPlaying';
import FilmPage from './components/films';
import CinemasPage from './components/cinemas';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLocationAsync,
  getLocationListsAsyc,
} from '@/store/common/location';
import CinemasInfo from './schedule';
import RouterLocation from '@/components/Route/routeFc';
import AuthHoc from '@/components/Auth/authFc';
import Map from './components/map';
import { getUserDataThunk } from '@/store/common/user';
import { user, userState } from '../types/user';

import SeatPage from './seats';
import Seat from './components/seat';
import KeepAlive from 'react-activation';

export default function App() {
  const token = useSelector<userState, string>((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fn = async () => {
      // do something
      await dispatch(getLocationAsync());
      await dispatch(getLocationListsAsyc());
    };
    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      await dispatch(getUserDataThunk());
    };
    if (token) {
      console.log('dasd', token);
      fn();
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/name/home/nowPlaying" />}
        ></Route>
        <Route path="/login" element={<Login></Login>} />

        <Route path="/location" element={<Location />} />
        <Route
          path="/name/*"
          element={
            <RouterLocation>
              <RouterPage1 />
            </RouterLocation>
          }
        >
          <Route
            path="home"
            element={
              <RouterLocation>
                <HomePage />
              </RouterLocation>
            }
          >
            <Route path="nowPlaying" element={<NowPlaying />}></Route>
            <Route path="comingSoon" element={<ComingSoon />}></Route>
          </Route>
          <Route path="news" element={<NewsPage />}></Route>
          <Route path="my" element={<MyPage />}></Route>
        </Route>
        <Route
          path="/films/:id"
          element={
            <RouterLocation>
              <FilmPage />
            </RouterLocation>
          }
        />

        <Route
          path="/films/cinemas/:id"
          element={
            <RouterLocation>
              <CinemasPage />
            </RouterLocation>
          }
        />
        <Route
          path="/films/chinemasInfo/:cinemaId/:filmId/:showDate"
          element={
            <RouterLocation>
              <KeepAlive>
                <CinemasInfo />
              </KeepAlive>
            </RouterLocation>
          }
        ></Route>
        <Route path="map/:lng/:lat" element={<Map />}></Route>
        <Route
          path="seat/:id/:showDate"
          element={<SeatPage></SeatPage>}
        ></Route>
      </Routes>
    </>
  );
}
