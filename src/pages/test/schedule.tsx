import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCinemasInfo,
  getCinemasShowInfo,
  getCinemasSchedule,
} from "../api/cinema";
import type { cinemasInfoImf } from "../types/cinema";
import type { scheduleImf } from "../types/schedule";

import NavTitle from "./components/navTitle";
import locationImg from "@/assets/img/location.png";
import phoneImg from "@/assets/img/phone.png";
import triggleImg from "@/assets/img/triggle.png";
import rightImg from "@/assets/img/right.png";

import CinemaSwiper from "./components/swiper";
import "@/pages/css/schedule.scss";

// import { Swiper } from "antd-mobile";
import { anctorImf, detailsImf, moviceDetailsImf } from "../types/movice";

import Tab from "./components/dateTab";
import { getTime, isStopSelling } from "../utils/day";
import { formatPrice } from "../utils/price";
import useSroll from "@/hook/scroll";
import LoadingIcon from "./components/loading";

export default function cinemasInfo() {
  const { cinemaId = "", filmId = "", showDate = "" } = useParams();
  const swiperRef = useRef<any>(null);
  const navigator = useNavigate();

  const cinemasInfoState = {
    Distance: 0,
    address: "",
    businessTime: "",
    cinemaId: 0,
    cityId: -1,
    cityName: "",
    district: {
      districtName: "",
      districtId: 0,
    },
    districtId: 0,
    districtName: "",
    eTicketFlag: 0,
    gpsAddress: "",
    isVisited: 0,
    latitude: 0,
    logoUrl: "",
    longitude: 0,
    lowPrice: 0,
    name: "",
    notice: "",
    phone: "",
    seatFlag: 1,
    services: [],
    telephones: [],
    ticketTypes: undefined,
  };

  const defaultDetails = {
    actors: [],
    category: "",
    director: "",
    filmId: 0,
    filmType: {
      name: "",
      value: 0,
    },
    isPresale: false,
    isSale: false,
    item: {
      name: "",
      type: 0,
    },
    language: "",
    name: "",
    nation: "",
    photos: [],
    poster: "",
    premiereAt: 0,
    runtime: 0,
    synopsis: "",
    timeType: 0,
    videoId: "",
    grade: 0,
    showDate: [],
  };

  const [loading, setLoading] = useState(false);
  const [fixed, setFixed] = useState(false);

  const [params, setParams] = useState<{
    cinemaId: string;
    date: string;
    details: moviceDetailsImf;
  }>({
    cinemaId,
    date: "",
    details: defaultDetails,
  });

  const [id, setFilmId] = useState<number>(0);

  const [cinemaInfo, setCinemaInfo] =
    useState<cinemasInfoImf>(cinemasInfoState);

  const [films, setFilms] = useState<Array<moviceDetailsImf>>([]);

  const [schedules, setSchedules] = useState<Array<scheduleImf>>([]);

  useEffect(() => {
    if (filmId) {
      setFilmId(Number(filmId));
    }
  }, [filmId]);

  useEffect(() => {
    async function fn() {
      const {
        data: { cinema },
      } = await getCinemasInfo({ cinemaId });
      setCinemaInfo(cinema);
      const {
        data: { films },
      } = await getCinemasShowInfo({ cinemaId });
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
    if (cinemaId && filmId) {
      fn();
    }
  }, [cinemaId, filmId]);

  useEffect(() => {
    async function fn() {
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

    if (params.date && id && cinemaId) {
      fn();
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
      .join(" ");
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
      <NavTitle back title={fixed ? cinemaInfo.name : ""}></NavTitle>
      <div className="cinemas-warpper">
        <div>
          <div className="cinemas-title  ">{cinemaInfo.name}</div>
        </div>
        <div className="cinemas-tags">
          {cinemaInfo.services &&
            cinemaInfo.services.slice(0, 4).map((item, key) => {
              return <span key={key}> {item.name} </span>;
            })}
        </div>
        <div className="cinemas-info">
          <div>
            <img
              src={locationImg}
              alt=""
              onClick={() =>
                navigator(
                  "/map/" + cinemaInfo.longitude + "/" + cinemaInfo.latitude
                )
              }
            />
          </div>
          <div className="text-ellipsis">{cinemaInfo.address}</div>
          <div>
            <a href={"tel:" + cinemaInfo.phone}>
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
              {params.details.name}{" "}
              <span>
                <i>{params.details.grade}</i> 分
              </span>
            </div>
            <div className="film-info-desc">
              {params.details.category} | {params.details.runtime}分钟 |{" "}
              {params.details.director} |{" "}
              {getAnctorsString(params.details.actors)}
            </div>
          </div>
          <div>
            <img
              src={rightImg}
              alt=""
              onClick={() => {
                navigator("/films/" + params.details.filmId);
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
        <div className="schedule-items">
          {!loading ? (
            schedules.map((item, index) => {
              return (
                <div
                  className={
                    isStopSelling(item.showAt, item.advanceStopMins)
                      ? "schedule-item disabled"
                      : "schedule-item"
                  }
                  key={item.scheduleId}
                  onClick={() =>
                    navigator(`/seat/${item.scheduleId}/${item.showAt}`)
                  }
                >
                  <div className="schedule-at">
                    <div>{getTime(item.showAt)}</div>
                    <div>{getTime(item.endAt)}</div>
                  </div>
                  <div className="schedule-info">
                    <div>
                      {item.filmLanguage} {item.imagery}
                    </div>
                    <div>{item.hallName}号厅</div>
                  </div>
                  <div className="schedule-price">
                    {formatPrice(item.salePrice)}
                  </div>
                  <div>购票</div>
                </div>
              );
            })
          ) : (
            <LoadingIcon></LoadingIcon>
          )}
        </div>
      </div>
    </>
  );
}
