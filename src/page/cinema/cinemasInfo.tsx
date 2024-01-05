import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getCinemasInfo, getCinemasShowInfo } from '@/api/cinema';
import { cinemasInfoResponseInfo, cinemasInfoImf } from '@/types/cinema';
import NavTitle from '@/components/Common/navTitle';
import locationImg from '@/assets/img/location.png';
import phoneImg from '@/assets/img/phone.png';
import triggleImg from '@/assets/img/triggle.png';

import CinemaSwiper from '@/components/Common/swiper';
import Styles from '@/assets/css/cinemasInfo.module.scss';

import { anctorImf, detailsImf } from '@/types/movice';

export default function cinemasInfo() {
  const { cinemaId = 0, filmId = '' } = useParams();
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
    cinemaId: number;
    date: string;
    filmId: number;
    details: detailsImf;
  }>({
    cinemaId: +cinemaId,
    date: '',
    filmId: 0,
    details: defaultDetails,
  });

  const [cinemaInfo, setCinemaInfo] = useState<cinemasInfoImf>(cinemasInfo);

  const [films, setFilms] = useState<Array<detailsImf>>([]);

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
      const index = films.findIndex((res) => res.filmId === +filmId);
      console.log(films.filter((res) => res.filmId === +filmId)[0]);
      setParams({
        ...params,
        details: films.filter((res) => res.filmId === +filmId)[0],
      });
      setTimeout(() => {
        swiperRef.current.swiper.slideTo(index, 1000);
      });
    }
    fn();
  }, [cinemaId, filmId]);

  function onSlideChange(e: number) {
    console.log(films[e]);
    setParams({
      ...params,
      details: films[e],
    });
    console.log(films[e]);
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
      <div className={Styles['cinemas-warpper']}>
        <div>
          <div className={Styles['cinemas-title']}>{cinemaInfo.name}</div>
        </div>
        {cinemaInfo.services ? (
          <div className={Styles['cinemas-tags']}>
            {cinemaInfo.services.slice(0, 4).map((item, key) => {
              return <span key={key}>{item.name}</span>;
            })}
          </div>
        ) : (
          <></>
        )}
        <div className={Styles['cinemas-info']}>
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
        <div>
          <div>
            {params.details.name} <span>{params.details.grade} 分</span>
          </div>
          <div>
            {params.details.category} | {params.details.runtime}分钟 |{' '}
            {params.details.director} |{' '}
            {getAnctorsString(params.details.actors)}
          </div>
        </div>
      </div>
    </>
  );
}
