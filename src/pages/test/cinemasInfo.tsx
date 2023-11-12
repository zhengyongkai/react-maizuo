import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  getCinemasInfo,
  getCinemasShowInfo,
  getCinemasSchedule,
} from '../api/cinema';
import { cinemasInfoResponseInfo, cinemasInfoImf } from '../types/cinema';
import NavTitle from './components/navTitle';
import locationImg from '@/assets/img/location.png';
import phoneImg from '@/assets/img/phone.png';
import triggleImg from '@/assets/img/triggle.png';
import rightImg from '@/assets/img/right.png';

import CinemaSwiper from './components/swiper';
import '@/pages/css/cinemasInfo.scss';

// import { Swiper } from "antd-mobile";
import { anctorImf, detailsImf } from '../types/movice';

import Tab from './components/dateTab';

type moviceDetailsImf = {
  showDate: Array<string>;
} & detailsImf;

export default function cinemasInfo() {
  const { cinemaId = '', filmId = '' } = useParams();
  const swiperRef = useRef<any>(null);

  const cinemasInfo = {
    Distance: 0,
    address: '',
    businessTime: '',
    cinemaId: 0,
    cityId: -1,
    cityName: '',
    district: {
      districtName: '',
      districtId: 0,
    },
    districtId: 0,
    districtName: '',
    eTicketFlag: 0,
    gpsAddress: '',
    isVisited: 0,
    latitude: 0,
    logoUrl: '',
    longitude: 0,
    lowPrice: 0,
    name: '',
    notice: '',
    phone: '',
    seatFlag: 1,
    services: [],
    telephones: [],
    ticketTypes: undefined,
  };

  const defaultDetails = {
    actors: [],
    category: '',
    director: '',
    filmId: 0,
    filmType: {
      name: '',
      value: 0,
    },
    isPresale: false,
    isSale: false,
    item: {
      name: '',
      type: 0,
    },
    language: '',
    name: '',
    nation: '',
    photos: [],
    poster: '',
    premiereAt: 0,
    runtime: 0,
    synopsis: '',
    timeType: 0,
    videoId: '',
    grade: 0,
    showDate: [],
  };

  const [params, setParams] = useState<{
    cinemaId: string;
    date: string;
    details: moviceDetailsImf;
  }>({
    cinemaId,
    date: '',
    details: defaultDetails,
  });

  const [cinemaInfo, setCinemaInfo] = useState<cinemasInfoImf>(cinemasInfo);

  const [films, setFilms] = useState<Array<moviceDetailsImf>>([]);

  useEffect(() => {
    async function fn() {
      const {
        data: { cinema },
      } = (await getCinemasInfo({ cinemaId })) as {
        data: cinemasInfoResponseInfo;
      };
      setCinemaInfo(cinema);
      const {
        data: { films },
      } = (await getCinemasShowInfo({ cinemaId })) as {
        data: {
          films: Array<moviceDetailsImf>;
        };
      };
      setFilms(films);

      const current = films.filter((res) => res.filmId === Number(filmId))[0];
      const index = films.findIndex((res) => res.filmId === Number(filmId));
      // console.log(films.filter((res) => res.filmId === Number(filmId))[0]);
      if (current.showDate && current.showDate[0]) {
        setParams({
          ...params,
          details: current,
          date: current.showDate[0],
        });
      }
      setTimeout(() => {
        swiperRef.current.swiper.slideTo(index, 1000);
      });
    }
    fn();
  }, [cinemaId, filmId]);

  useEffect(() => {
    async function fn() {
      await getCinemasSchedule({
        filmId: filmId,
        cinemaId: params.cinemaId,
        date: params.date,
      });
    }

    if (params.date && filmId) {
      fn();
    }
  }, [cinemaId, filmId, params.date]);

  function onSlideChange(e: number) {
    setParams({
      ...params,
      details: films[e],
      date: films[e].showDate[0],
    });
  }

  function getAnctorsString(actors: Array<anctorImf>) {
    return actors
      .reduce((pre, item) => {
        return pre.concat(item.name);
      }, [] as Array<string>)
      .join(' ');
  }

  return (
    <>
      <NavTitle back></NavTitle>
      <div className="cinemas-warpper">
        <div>
          <div className="cinemas-title">{cinemaInfo.name}</div>
        </div>
        <div className="cinemas-tags">
          {cinemaInfo.services.slice(0, 4).map((item, key) => {
            return <span key={key}>{item.name}</span>;
          })}
        </div>
        <div className="cinemas-info">
          <div>
            <img src={locationImg} alt="" />
          </div>
          <div className="text-ellipsis">{cinemaInfo.address}</div>
          <div>
            <a href={'tel:' + cinemaInfo.phone}>
              <img src={phoneImg} alt="" />
            </a>
          </div>
        </div>
        <div className="cinemas-film-list">
          <div className="cinemas-film-cover">
            <div
              style={{
                backgroundImage: `url('${params.details.poster}')`,
              }}
            ></div>
          </div>
          <CinemaSwiper
            items={films}
            change={(e) => onSlideChange(e)}
            ref={swiperRef}
          />
          <div className="film-triggle">
            <img src={triggleImg} />
          </div>
        </div>
        <div className="film-info">
          <div>
            <div className="film-info-name">
              {params.details.name}{' '}
              <span>
                <i>{params.details.grade}</i> 分
              </span>
            </div>
            <div className="film-info-desc">
              {params.details.category} | {params.details.runtime}分钟 |{' '}
              {params.details.director} |{' '}
              {getAnctorsString(params.details.actors)}
            </div>
          </div>
          <div>
            <img src={rightImg} alt="" />
          </div>
        </div>
        <div>
          {params.details.showDate && (
            <Tab
              tabList={params.details.showDate}
              defaultActive={0}
              onChange={(index, item) => {
                setParams({
                  ...params,
                  date: item,
                });
              }}
            ></Tab>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}
