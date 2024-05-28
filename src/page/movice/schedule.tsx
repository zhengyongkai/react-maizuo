import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCinemasInfo, getCinemasShowInfo, getCinemasSchedule } from '@/api/cinema';

import NavTitle from '@/components/Layout/NavTitle';
import locationImg from '@/assets/img/location.png';
import phoneImg from '@/assets/img/phone.png';
import triggleImg from '@/assets/img/triggle.png';
import rightImg from '@/assets/img/right.png';

import CinemaSwiper from '@/components/Common/Swiper';
// import Styles from '@/assets/css/schedule.module.scss';

// import { Swiper } from "antd-mobile";

import Tab from '@/components/Common/DateTab';
import { getTime, isStopSelling } from '@/utils/day';
import { formatPrice } from '@/utils/price';
import useSroll from '@/hook/scroll';

import PartLoading from '@/components/Common/PartLoading';
import { cssCb } from '@/utils/css';

import type { cinemasInfoInf } from '@/types/cinema';
import type { scheduleInf } from '@/types/schedule';
import type { anctorInf, detailsInf, moviceDetailsInf } from '@/types/movice';
import { scrollTop } from '@/utils';

export default function Schedule() {
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
      districtId: 0
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
    ticketTypes: undefined
  };

  const defaultDetails = {
    actors: [],
    category: '',
    director: '',
    filmId: 0,
    filmType: {
      name: '',
      value: 0
    },
    isPresale: false,
    isSale: false,
    item: {
      name: '',
      type: 0
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
    showDate: []
  };

  const [loading, setLoading] = useState(false);
  const [fixed, setFixed] = useState(false);

  const [params, setParams] = useState<{
    cinemaId: number;
    date: string;
    details: moviceDetailsInf;
  }>({
    cinemaId: +cinemaId,
    date: '',
    details: defaultDetails
  });

  const [id, setFilmId] = useState<number>(0);

  const [cinemaInfo, setCinemaInfo] = useState<cinemasInfoInf>(cinemasInfoState);

  const [films, setFilms] = useState<Array<moviceDetailsInf>>([]);

  const [schedules, setSchedules] = useState<Array<scheduleInf>>([]);

  useEffect(() => {
    if (filmId) {
      setFilmId(+filmId);
    }
  }, [filmId]);

  useEffect(() => {
    async function fn() {
      const {
        data: { cinema }
      } = await getCinemasInfo({ cinemaId: +cinemaId });
      setCinemaInfo(cinema);
      const {
        data: { films }
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
            date: current.showDate[0]
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
          date: current.showDate[0]
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

  useSroll(() => {
    if (scrollTop > 20) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  });

  useEffect(() => {
    if (params.date && id && cinemaId) {
      getCinemasScheduleList();
    }
  }, [cinemaId, id, params.date]);

  /**
   * @description: 加载列表数据
   * @return {*}
   */
  async function getCinemasScheduleList() {
    setLoading(true);
    const {
      data: { schedules }
    } = await getCinemasSchedule({
      filmId: id,
      cinemaId: params.cinemaId,
      date: params.date
    });
    setSchedules(schedules);
    setLoading(false);
  }

  /**
   * @description: 轮播更改时候，数据跟着刷新
   * @param {number} e：当前轮播的index
   * @return {*}
   */
  function onSlideChange(e: number) {
    setParams({
      ...params,
      details: films[e],
      date: films[e].showDate[0]
    });
    setFilmId(films[e].filmId);
  }

  /**
   * @description: 获取人员信息
   * @param {Array} actors
   * @return {*}
   */
  function getAnctorsString(actors: Array<anctorInf>) {
    return actors
      .reduce((pre, item) => {
        return pre.concat(item.name);
      }, new Array<string>())
      .join(' ');
  }

  /**
   * @description: 跳转到选座位页面
   * @param {scheduleInf} item
   * @return {*}
   */
  function onBuyTicket(item: scheduleInf) {
    if (!isStopSelling(item.showAt, item.advanceStopMins)) {
      navigator(`/seat/${item.scheduleId}/${item.showAt}`);
    }
  }

  return (
    <>
      <NavTitle back title={fixed ? cinemaInfo.name : ''}></NavTitle>
      <div bg-white>
        <div>
          <div
            truncate
            m-auto
            pt-48
            text-center
            relative
            text-17
            text-black
            h-44
            leading-44
            className="w-[80%]">
            {cinemaInfo.name}
          </div>
        </div>
        <div mx-auto flex w-fit pt-5 pb-15>
          {cinemaInfo.services &&
            cinemaInfo.services.slice(0, 4).map((item, key) => {
              return (
                <span
                  border-1
                  border-solid
                  border="[#ffb232]"
                  px-6
                  mx="2.5"
                  text-10
                  text-yellow-50
                  hidden
                  relative
                  key={key}>
                  {' '}
                  {item.name}{' '}
                </span>
              );
            })}
        </div>
        <div items-center flex px-17 h-50>
          <div>
            <img
              w-14
              mr-6
              src={locationImg}
              alt=""
              onClick={() => navigator('/map/' + cinemaInfo.longitude + '/' + cinemaInfo.latitude)}
            />
          </div>
          <div className="truncate flex-1 px-3">{cinemaInfo.address}</div>
          <div>
            <a href={'tel:' + cinemaInfo.phone}>
              <img w-17 src={phoneImg} alt="" />
            </a>
          </div>
        </div>
        <div h-160 pt-15 relative>
          <div absolute inset-0 h-160 overflow-hidden>
            <div
              h="100%"
              w="100%"
              blur="30px"
              style={{
                backgroundImage: `url('${params.details.poster}')`
              }}></div>
          </div>
          <CinemaSwiper items={films} change={(e) => onSlideChange(e)} ref={swiperRef} />
          <div relative top-5 flex justify-center>
            <img src={triggleImg} />
          </div>
        </div>
        <div relative px-15>
          <div>
            <div text-15 text-black text-center mb-10 pr-5>
              {params.details.name}{' '}
              <span text-10 text-yellow-50>
                <i text-16>{params.details.grade}</i> 分
              </span>
            </div>
            <div pb-16 w="98%" text-center h-18 text-grey-50 text-13 overflow-hidden truncate>
              {params.details.category} | {params.details.runtime}分钟 | {params.details.director} |{' '}
              {getAnctorsString(params.details.actors)}
            </div>
          </div>
          <div>
            <img
              absolute
              top-20
              right-15
              w-6
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
                  date: item
                });
              }}></Tab>
          )}
        </div>
        <div relative bg-white>
          <PartLoading loading={loading}>
            {schedules.map((item, index) => {
              return (
                <div
                  h-74
                  p-15
                  box-border
                  flex
                  items-center
                  className={cssCb([
                    isStopSelling(item.showAt, item.advanceStopMins) ? Styles['disabled'] : ''
                  ])}
                  key={item.scheduleId}>
                  <div flex flex-col justify-between w-60>
                    <div text-15 text-black>
                      {getTime(item.showAt)}
                    </div>
                    <div text-13 text-grey-50 mt-2>
                      {getTime(item.endAt)}
                    </div>
                  </div>
                  <div flex-1 w-60 flex flex-col justify-between>
                    <div text-15 text-black>
                      {item.filmLanguage} {item.imagery}
                    </div>
                    <div text-13 text-grey-50 mt-2>
                      {item.hallName}号厅
                    </div>
                  </div>
                  <div flex flex-col justify-between pr-20 leading-25 text-orange-50 text-15>
                    {formatPrice(item.salePrice)}
                  </div>

                  <div
                    border-1
                    border-solid
                    border="orange-50"
                    text-orange-50
                    text-center
                    leading-25
                    h-25
                    w-50
                    rounded-2
                    flex
                    flex-col
                    justify-between
                    onClick={() => onBuyTicket(item)}>
                    购票
                  </div>
                </div>
              );
            })}
          </PartLoading>
        </div>
      </div>
    </>
  );
}
