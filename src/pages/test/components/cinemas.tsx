// import useFetch from "@/hook/fetch";
import useLocation from '@/hook/location';
import dayjs from 'dayjs';
import {
  getCinemas,
  getCinemasList,
  getMoviceDetail,
} from '@/pages/api/movice';
import {
  cinemaListResponseImf,
  cinemaResponseImf,
  moviceImf,
  chinemaDetailImf,
} from '@/pages/types/movice';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import '@/pages/css/cinemas.scss';

import NavTitle from './navTitle';
import { Dropdown, List } from 'antd-mobile';
import Loading from './loading';
import { useSelector } from 'react-redux';
import { tudeStateImf } from '@/types/location';
import { getBetweenDistance } from '@/pages/utils/location';

export default function cinemas() {
  const menuRef = useRef<any>();
  const locationAttr = useSelector(
    (state: tudeStateImf) => state.location.tude
  );
  const { id = '' } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState('');
  const [date, setDate] = useState(0);

  const [params, setParams] = useState({
    filmId: '',
    cityId: 0,
    cinemaIds: '',

    // cityName: "",
  });

  const [film, setFilm] = useState<moviceImf>({
    filmId: 0,
    name: '',
    category: '',
    synopsis: '',
    poster: '',
    grade: '',
    actors: [],
    runtime: 0,
    nation: '',
  });

  const [cinema, setCinemas] = useState<cinemaResponseImf>({
    cinemaExtendList: [],
    showCinemas: [],
  });

  const [cinemaList, setCinemasList] = useState<{
    cinemas: Map<string, chinemaDetailImf[]>;
    cinemasList: chinemaDetailImf[];
  }>({
    cinemas: new Map(),
    cinemasList: [],
  });

  function getDistance(longitude: number, latitude: number) {
    console.log(locationAttr, latitude, longitude);
    return getBetweenDistance(
      locationAttr.latitude,
      locationAttr.longitude,
      latitude,
      longitude
    );
  }

  location((locale) => {
    setParams({
      filmId: id,
      cityId: 440300,
      cinemaIds: '',
      // cityName: params.cityName,
    });
  });
  useEffect(() => {
    async function fn() {
      const {
        data: { film },
      } = await getMoviceDetail({ filmId: id });
      setFilm(film);
    }
    fn();
  }, []);
  useEffect(() => {
    async function getList() {
      const {
        data: { cinemaExtendList, showCinemas },
      } = (await getCinemas(params)) as {
        data: cinemaResponseImf;
      };

      setCinemas({
        cinemaExtendList,
        showCinemas: showCinemas,
      });

      setDate(showCinemas[0].showDate);
    }
    if (params.filmId) {
      getList();
    }
  }, [params.filmId]);

  useEffect(() => {
    if (cinema.showCinemas.length && film.filmId) {
      setLoading(true);

      const cinemaIds = params.cinemaIds
        ? params.cinemaIds
        : cinema.showCinemas[0].cinemaList.join(',');
      async function fn() {
        const {
          data: { cinemas },
        } = (await getCinemasList({
          cityId: 440300,
          cinemaIds,
        })) as cinemaListResponseImf;
        const moviceMap = new Map<string, Array<chinemaDetailImf>>();
        cinemas.forEach((element) => {
          // console.log(element);
          const key = moviceMap.get(element.districtName);

          if (key) {
            moviceMap.set(element.districtName, [...key, element]);
          } else {
            moviceMap.set(element.districtName, [element]);
          }
        });
        setCinemasList({
          cinemas: moviceMap,
          cinemasList: [...moviceMap.values()][0],
        });
        setCityName([...moviceMap.values()][0][0].districtName);
        setLoading(false);
      }
      fn();
    }
  }, [cinema, film, params.cinemaIds]);

  function cityItemsChange(res: string) {
    setCinemasList({
      cinemas: cinemaList.cinemas,
      cinemasList: cinemaList.cinemas.get(res) || [],
    });
    menuRef.current.close();
    setCityName(res);
  }

  function formatPrice(price: number) {
    const pre = String(price).slice(0, 2);
    // const sub = String(price).slice(2);
    // return String(price).
    return pre;
  }

  // function formatDate(date: number) {
  //   let dates = dayjs.unix(date);
  // }

  return (
    <>
      <NavTitle title={film.name} back={true} />
      <div>
        <div className="cinemas-dates  inner-scroll">
          {cinema.showCinemas.map((item, index) => {
            return (
              <div
                className={item.showDate === date ? 'cinemas-dates-active' : ''}
                key={index}
                onClick={() => {
                  setParams({
                    ...params,
                    cinemaIds: item.cinemaList.join(','),
                  });
                  setDate(item.showDate);
                }}
              >
                <span>{dayjs.unix(item.showDate).format('MM月D日')}</span>
              </div>
            );
          })}
        </div>
        <Dropdown ref={menuRef}>
          <Dropdown.Item key="location" title={cityName}>
            <div className="city-items">
              {[...cinemaList.cinemas.keys()].map((res, item) => {
                return (
                  <div
                    className="city-item"
                    onClick={() => cityItemsChange(res)}
                    style={
                      cityName === res
                        ? { border: '1px solid #ff5f16', color: '#ff5f16' }
                        : {}
                    }
                  >
                    {res}
                  </div>
                );
              })}
            </div>
          </Dropdown.Item>
          <Dropdown.Item key="recent" title="离我最近">
            <List>
              <List.Item>离我最近</List.Item>
            </List>
          </Dropdown.Item>
        </Dropdown>
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="cinemas-items">
            {cinemaList.cinemasList.map((item) => {
              return (
                <div className="cinemas-item">
                  <div className="cinemas-top">
                    <div>{item.name}</div>
                    <div>
                      <span>
                        <i>￥</i>
                        {formatPrice(item.lowPrice)}
                      </span>{' '}
                      <span>起</span>{' '}
                    </div>
                  </div>
                  <div className="cinemas-bottom">
                    <div className="text-ellipsis">{item.address}</div>
                    <div>{getDistance(item.latitude, item.longitude)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
