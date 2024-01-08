import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getCinemasInfo,
  getCinemasShowInfo,
  getCinemasSchedule,
} from '@/api/cinema';

import NavTitle from '@/components/Common/navTitle';
import locationImg from '@/assets/img/location.png';
import phoneImg from '@/assets/img/phone.png';
import triggleImg from '@/assets/img/triggle.png';
import rightImg from '@/assets/img/right.png';

import CinemaSwiper from '@/components/Common/swiper';
import Styles from '@/assets/css/schedule.module.scss';

// import { Swiper } from "antd-mobile";

import Tab from '@/components/Common/dateTab';
import { getTime, isStopSelling } from '@/utils/day';
import { formatPrice } from '@/utils/price';
import useSroll from '@/hook/scroll';

import PartLoading from '@/components/Common/partLoading';
import { combineCss } from '@/utils/css';

import type { cinemasInfoImf } from '@/types/cinema';
import type { scheduleImf } from '@/types/schedule';
import type { anctorImf, detailsImf, moviceDetailsImf } from '@/types/movice';

export default function cinemasInfo() {
  const { cinemaId = '', filmId = '', showDate = '' } = useParams();
  const swiperRef = useRef<any>(null);
  const navigator = useNavigate();

  const cinemasInfoState = {
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

  const [loading, setLoading] = useState(false);
  const [fixed, setFixed] = useState(false);

  const [params, setParams] = useState<{
    cinemaId: number;
    date: string;
    details: moviceDetailsImf;
  }>({
    cinemaId: +cinemaId,
    date: '',
    details: defaultDetails,
  });

  const [id, setFilmId] = useState<number>(0);

  const [cinemaInfo, setCinemaInfo] =
    useState<cinemasInfoImf>(cinemasInfoState);

  const [films, setFilms] = useState<Array<moviceDetailsImf>>([]);

  const [schedules, setSchedules] = useState<Array<scheduleImf>>([]);

  // useActivate(() => {
  //   getCinemasScheduleList();
  // });

  useEffect(() => {
    if (filmId) {
      setFilmId(+filmId);
    }
  }, [filmId]);

  useEffect(() => {
    async function fn() {
      const {
        data: { cinema },
      } = await getCinemasInfo({ cinemaId: +cinemaId });
      setCinemaInfo(cinema);
      const {
        data: { films },
      } = await getCinemasShowInfo({ cinemaId: +cinemaId });
      setFilms(films);

      if (+filmId !== 0) {
        // 如果存在 filmId
        let current = films.filter((res) => res.filmId === +filmId)[0];
        let index = films.findIndex((res) => res.filmId === +filmId);
        if (current.showDate && current.showDate[0]) {
          setParams({
            ...params,
            details: current,
            date: current.showDate[0],
          });
          setTimeout(() => {
            swiperRef.current.swiper.slideTo(index, 1000);
          });
        }
      } else {
        // 如果不存在 filmId, 直接拿第一个电影就行
        let current = films[0];
        let index = 0;
        setFilmId(current.filmId);
        setParams({
          ...params,
          details: current,
          date: current.showDate[0],
        });
        setTimeout(() => {
          swiperRef.current.swiper.slideTo(index, 1000);
        });
      }
    }
    if (cinemaId && filmId) {
      fn();
    }
  }, [cinemaId, filmId]);

  async function getCinemasScheduleList() {
    setLoading(true);
    const {
      data: { schedules },
    } = await getCinemasSchedule({
      filmId: id,
      cinemaId: params.cinemaId,
      date: params.date,
    });
    setSchedules(schedules);
    setLoading(false);
  }

  useEffect(() => {
    if (params.date && id && cinemaId) {
      getCinemasScheduleList();
    }
  }, [cinemaId, id, params.date]);

  function onSlideChange(e: number) {
    setParams({
      ...params,
      details: films[e],
      date: films[e].showDate[0],
    });
    setFilmId(films[e].filmId);
  }

  function getAnctorsString(actors: Array<anctorImf>) {
    return actors
      .reduce((pre, item) => {
        return pre.concat(item.name);
      }, [] as Array<string>)
      .join(' ');
  }

  useSroll(() => {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTop > 20) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  });

  return (
    <>
      <NavTitle back title={fixed ? cinemaInfo.name : ''}></NavTitle>
      <div className={Styles['cinemas-warpper']}>
        <div>
          <div className={Styles['cinemas-title']}>{cinemaInfo.name}</div>
        </div>
        <div className={Styles['cinemas-tags']}>
          {cinemaInfo.services &&
            cinemaInfo.services.slice(0, 4).map((item, key) => {
              return <span key={key}> {item.name} </span>;
            })}
        </div>
        <div className={Styles['cinemas-info']}>
          <div>
            <img
              src={locationImg}
              alt=""
              onClick={() =>
                navigator(
                  '/map/' + cinemaInfo.longitude + '/' + cinemaInfo.latitude
                )
              }
            />
          </div>
          <div className="text-ellipsis">{cinemaInfo.address}</div>
          <div>
            <a href={'tel:' + cinemaInfo.phone}>
              <img src={phoneImg} alt="" />
            </a>
          </div>
        </div>
        <div className={Styles['cinemas-film-list']}>
          <div className={Styles['cinemas-film-cover']}>
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
          <div className={Styles['film-triggle']}>
            <img src={triggleImg} />
          </div>
        </div>
        <div className={Styles['film-info']}>
          <div>
            <div className={Styles['film-info-name']}>
              {params.details.name}{' '}
              <span>
                <i>{params.details.grade}</i> 分
              </span>
            </div>
            <div className={Styles['film-info-desc']}>
              {params.details.category} | {params.details.runtime}分钟 |{' '}
              {params.details.director} |{' '}
              {getAnctorsString(params.details.actors)}
            </div>
          </div>
          <div>
            <img
              src={rightImg}
              alt=""
              onClick={() => {
                navigator('/films/' + params.details.filmId);
              }}
            />
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
        <div className={Styles['schedule-items']}>
          <PartLoading loading={loading}>
            {schedules.map((item, index) => {
              return (
                <div
                  className={combineCss([
                    Styles['schedule-item'],
                    isStopSelling(item.showAt, item.advanceStopMins)
                      ? Styles['disabled']
                      : '',
                  ])}
                  key={item.scheduleId}
                  onClick={() =>
                    navigator(`/seat/${item.scheduleId}/${item.showAt}`)
                  }
                >
                  <div className={Styles['schedule-at']}>
                    <div>{getTime(item.showAt)}</div>
                    <div>{getTime(item.endAt)}</div>
                  </div>
                  <div className={Styles['schedule-info']}>
                    <div>
                      {item.filmLanguage} {item.imagery}
                    </div>
                    <div>{item.hallName}号厅</div>
                  </div>
                  <div className={Styles['schedule-price']}>
                    {formatPrice(item.salePrice)}
                  </div>
                  <div>购票</div>
                </div>
              );
            })}
          </PartLoading>
        </div>
      </div>
    </>
  );
}
