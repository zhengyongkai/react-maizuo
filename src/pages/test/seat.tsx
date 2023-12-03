import useFetch from "@/hook/fetch";
import { NoticeBar } from "antd-mobile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeatDetails } from "../api/seat";
import { seatResponseInf } from "../types/seat";
import LoadingIcon from "./components/loading";
import NavTitle from "./components/navTitle";

import "@/pages/css/seat.scss";
import SvgIcon from "@/components/SvgIcon";
import { getDaysNameFn, getTime } from "../utils/day";

import dayjs from "dayjs";
import { getCinemasSchedule } from "../api/cinema";
import { scheduleImf } from "../types/schedule";
import { formatPrice } from "../utils/price";

const initSeat = {
  schedule: {
    cinema: {
      latitude: 0,
      longitude: 0,
      districtId: 0,
      districtName: "",
      Distance: 0,
      address: "",
      businessTime: "",
      cinemaId: 0,
      cityId: 0,
      cityName: "",
      eTicketFlag: 0,
      gpsAddress: "",
      isVisited: 0,
      logoUrl: "",
      lowPrice: 0,
      name: "",
      notice: "",
      phone: "",
      seatFlag: 0,
      telephones: [],
      district: {
        districtId: 0,
        districtName: "",
      },
    },
    film: {
      filmId: 0,
      name: "",
      category: "",
      synopsis: "",
      poster: "",
      grade: "",
      actors: [],
      runtime: 0,
      nation: "",
      language: "",
    },
    advanceStopMins: 0,
    endAT: 0,
    hall: {
      hallId: "",
      name: "",
    },
    imagery: "",
    isMobileRequiredForLocking: false,
    isOnsell: false,
    lockSeatRulesInf: {
      ruleCheckType: 0,
      rules: [],
    },
    maxSeatsCount: 0,
    noticeMsg: "",
    price: {
      market: 0,
      premium: 0,
      sale: 0,
    },
    provider: {
      providerId: 0,
      scheduleId: "",
    },
    readNameAuth: {
      authType: 0,
    },
    scheduleId: 0,
    sectionPrices: [],
    showAt: 0,
  },
};

export default function SeatPage() {
  const { scheduleId, showDate } = useParams();
  const [scheduleList, setScheduleList] = useState<Array<scheduleImf>>([]);
  const [showSchedule, setShowSchedule] = useState(false);

  let [{ schedule }, loading] = useFetch<seatResponseInf>(
    () => getSeatDetails({ scheduleId: Number(scheduleId) }),
    initSeat,
    [scheduleId]
  );

  useEffect(() => {
    async function fn() {
      const {
        data: { schedules },
      } = await getCinemasSchedule({
        filmId: schedule.film.filmId,
        cinemaId: schedule.cinema.cinemaId,
        date: showDate,
      });
      setScheduleList(schedules);
    }
    if (schedule.film.filmId && schedule.cinema.cinemaId && showDate) {
      fn();
    }
  }, [schedule.film.filmId, schedule.cinema.cinemaId, showDate]);

  return (
    <>
      {!loading ? (
        <>
          <div>
            <NavTitle title={schedule.cinema.name} back></NavTitle>
          </div>
          <div className="seating-chair">
            <NoticeBar content={schedule.noticeMsg} color="alert"></NoticeBar>
          </div>
          <div style={{ height: 420 }}></div>
          <div>
            <div className="seating-tips">
              <div>
                <SvgIcon size={24} name="lock"></SvgIcon>
                <span>不可选</span>
              </div>
              <div>
                <SvgIcon size={24} name="sold"></SvgIcon>
                <span>已售</span>
              </div>
              <div>
                <SvgIcon size={24} name="seat"></SvgIcon>
                <span>可选</span>
              </div>
              <div>
                <SvgIcon size={24} name="choose"></SvgIcon>
                <span>选中</span>
              </div>
            </div>

            <div className="seating-chosing">
              <div>
                <div className="seating-name">
                  <div>{schedule.film.name}</div>
                  <div onClick={() => setShowSchedule(!showSchedule)}>
                    收起场次
                  </div>
                </div>
                <div className="seating-info">
                  {getDaysNameFn(schedule.showAt, true)}{" "}
                  {schedule.film.language} {schedule.imagery}
                </div>
              </div>
              {showSchedule ? (
                <div className="seating-schedule  inner-scroll">
                  {scheduleList.map((item, index) => {
                    return (
                      <div key={index}>
                        <div>{getTime(item.showAt)}</div>
                        <div>
                          {item.filmLanguage} {item.imagery}
                        </div>
                        <div>{formatPrice(item.salePrice)}</div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
          <div className="seating-choose disabled">请先选座</div>
        </>
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}
