import useFetch from "@/hook/fetch";
import { NoticeBar, Toast } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeatDetails } from "../api/seat";
import {
  seatingChartInf,
  seatListInf,
  seatResponseInf,
  seatsInf,
} from "../types/seat";
import LoadingWrap from "./components/loading";
import NavTitle from "./components/navTitle";

import "@/pages/css/seat.scss";
import SvgIcon from "@/components/SvgIcon";
import { getDaysNameFn, getTime } from "../utils/day";

// import dayjs from "dayjs";
import { getCinemasSchedule, getCinemasSeat } from "../api/cinema";
import { scheduleImf } from "../types/schedule";
import { formatPrice } from "../utils/price";
import { showDialog } from "../utils/dialog";
import {
  AXION_MIDDLE_WIDTH,
  COUPLE_SEAT_IS_RIGHT,
  MAXSCALE,
  SEAT_DEFAULT_HEIGHT,
  SEAT_DEFAULT_WIDTH,
} from "@/store/constants";
import * as d3 from "d3";
import * as d3Select from "d3-selection";
import * as d3Zoom from "d3-zoom";

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
    endAt: 0,
    hall: {
      hallId: 0,
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

const initSeats = {
  hall: {
    hallId: 0,
    name: "",
    limit: "",
  },
  height: 0,
  width: 0,
  scheduleId: 0,
  seats: [],
};

export default function SeatPage() {
  let screenCtx: any = null;
  let axionYCtx: any = null;
  let seatingChartContext: any = null;
  let seatingChartContextWrap: any = null;
  // let zoomInstance = null;

  const { id = 0, showDate } = useParams();
  const [scheduleList, setScheduleList] = useState<Array<scheduleImf>>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [seatsList, setSeatsList] = useState<seatingChartInf>(initSeats);
  const [scheduleId, setScheduleId] = useState<number>(+id);

  const [seatingChartStyle, setSeatingChartStyle] = useState({
    height: "275px",
    width: "650px",
  });

  const [screenStyle, setScreenStyle] = useState({
    left: "0px",
  });

  const screen = useRef(null);
  const axionY = useRef(null);
  const zoomInstance = useRef<d3Zoom.ZoomBehavior<Element, any>>();
  const map = useRef(null);
  const axionMiddle = useRef<HTMLDivElement>(null);
  const seatingChartContextWrapRef = useRef(null);

  let [{ schedule }, loading] = useFetch<seatResponseInf>(
    () => {
      return getSeatDetails({ scheduleId: +scheduleId });
    },
    initSeat,
    [scheduleId]
  );

  useEffect(() => {
    async function fn() {
      const {
        data: { seatingChart },
      } = await getCinemasSeat({
        scheduleId: scheduleId,
      });
      setSeatsList(seatingChart);
    }
    if (scheduleId) {
      fn();
    }
  }, [scheduleId]);

  useEffect(() => {
    initSeatComposition();
  }, [seatsList]);

  useEffect(() => {
    async function fn() {
      try {
        const {
          data: { schedules },
        } = await getCinemasSchedule({
          filmId: schedule.film.filmId,
          cinemaId: schedule.cinema.cinemaId,
          date: showDate,
        });
        // console.log(schedules);
        setScheduleList(schedules);
        setScheduleId(schedule.scheduleId);
        console.log(schedule.scheduleId);
        // console.log(data);
      } catch {
        showDialog.show({ content: "该场次已经结束" });
      }
    }
    if (schedule.film.filmId && schedule.cinema.cinemaId && showDate) {
      fn();
    }
  }, [schedule.film.filmId, schedule.cinema.cinemaId, showDate]);

  function zoom(event: any) {
    // console.log(event);
    seatingChartContext.style(
      "transform",
      "translate(" +
        event.transform.x +
        "px," +
        event.transform.y +
        "px) scale(" +
        event.transform.k +
        ")"
    );
    seatingChartContext.style(
      "-webkit-transform",
      "translate(" +
        event.transform.x +
        "px," +
        event.transform.y +
        "px) scale(" +
        event.transform.k +
        ")"
    );

    if (event.transform.k > MAXSCALE) {
      screenCtx.style("transform", `scale(${MAXSCALE})`);
      screenCtx.style("-webkit-transform", `scale(${MAXSCALE})`);
    } else {
      screenCtx.style("transform", `scale(${event.transform.k})`);
      screenCtx.style("-webkit-transform", `scale(${event.transform.k})`);
    }
    axionYCtx.style(
      "transform",
      `translateY(${event.transform.y}px) scale(1, ${event.transform.k})`
    );
    axionYCtx.style(
      "-webkit-transform",
      `translateY(${event.transform.y}px) scale(1, ${event.transform.k})`
    );

    var domArr = axionMiddle.current;
    setTimeout(() => {
      if (domArr) {
        let x = 0;
        x =
          domArr.getBoundingClientRect().x ||
          domArr.getBoundingClientRect().left;

        setScreenStyle({
          left:
            x -
            ((event.transform.k > MAXSCALE ? MAXSCALE : event.transform.k) *
              AXION_MIDDLE_WIDTH) /
              2 +
            "px",
        });

        const scaleX = event.transform.k;
        const targetEls = axionYCtx._groups[0][0].children || [];
        for (let index = 0; index < targetEls.length; index++) {
          const element = targetEls[index];
          if (scaleX > 1) {
            element.style.transform = `scale(1, 0.5)`;
          } else {
            element.style.transform = `scale(${scaleX})`;
          }
        }
      }
    }, 0);
  }

  function initSeatComposition() {
    zoomInstance.current = d3Zoom
      .zoom()
      .scaleExtent([1 / 2, 2])
      .on("zoom", zoom);

    screenCtx = d3Select.select(screen.current);
    axionYCtx = d3Select.select(axionY.current);

    seatingChartContextWrap = d3Select.select(
      seatingChartContextWrapRef.current
    );
    seatingChartContext = d3Select.select(map.current);
    seatingChartContextWrap.call(zoomInstance.current);

    const chartWidth = seatsList.width * SEAT_DEFAULT_WIDTH;
    const chartHeight = seatsList.height * SEAT_DEFAULT_HEIGHT;
    setSeatingChartStyle({
      width: chartWidth + "px",
      height: chartHeight + "px",
    });
    const currentK = window.innerWidth / chartWidth;
    let t = d3.zoomIdentity.scale(currentK);
    zoomInstance.current.scaleExtent([currentK, 2]);
    zoomInstance.current.transform(seatingChartContextWrap, t);
  }

  function getSeatingRowsAndColumnsNum() {
    const columnNumMap = new Map();
    const rowNumMap = new Map();
    const rcObjs = seatsList.seats.reduce(
      (pre, item) => {
        if (!columnNumMap.get(item.columnNum)) {
          columnNumMap.set(item.columnNum, 1);
          pre.columnNum++;
        }
        if (!rowNumMap.get(item.rowNum)) {
          rowNumMap.set(item.rowNum, 1);
          pre.rowNum++;
        }
        return pre;
      },
      { rowNum: 0, columnNum: 0 }
    );
    return rcObjs;
  }

  const rowNum = getSeatingRowsAndColumnsNum().rowNum;

  function getSeatPosition(s: seatsInf) {
    const column = s.columnNum;
    const row = s.rowNum;
    if (s.coupleType === COUPLE_SEAT_IS_RIGHT) {
      return {
        display: "none",
      };
    }
    return {
      left: (+column - 1) * SEAT_DEFAULT_WIDTH + "px",
      top: (+row - 1) * SEAT_DEFAULT_HEIGHT + "px",
    };
  }
  return (
    <>
      <div>
        <NavTitle title={schedule.cinema.name} back></NavTitle>
      </div>
      <div className="seating-chair">
        <NoticeBar content={schedule.noticeMsg} color="alert"></NoticeBar>
      </div>
      <div style={{ height: 420 }}>
        <div ref={seatingChartContextWrapRef} className="seating-chart-wrap">
          <div style={{ ...seatingChartStyle }}>
            <div
              className="seating-screen"
              ref={screen}
              style={{ ...screenStyle }}
            >
              {schedule.hall.name}
            </div>
            <div className="axion-y" ref={axionY}>
              {[...new Array(rowNum)].map((res, index) => {
                return (
                  <div className="rowName" key={index}>
                    {index + 1}
                  </div>
                );
              })}
            </div>
            <div className="map" ref={map}>
              <div
                className="axion-middle"
                style={{ height: rowNum * 25 }}
                ref={axionMiddle}
              ></div>
              <div className="seats">
                {seatsList.seats.map((item, index) => {
                  return (
                    <div
                      className="seat"
                      style={getSeatPosition(item)}
                      key={index}
                    >
                      <SvgIcon size={24} name="seat"></SvgIcon>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
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
                {showSchedule ? "收起场次" : "展开场次"}
              </div>
            </div>
            <div className="seating-info">
              {getDaysNameFn(schedule.showAt, true)} {schedule.film.language}{" "}
              {schedule.imagery}
            </div>
          </div>

          <div className="seating-schedule  inner-scroll">
            {showSchedule
              ? scheduleList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={scheduleId === item.scheduleId ? "active" : ""}
                      onClick={() => setScheduleId(item.scheduleId)}
                    >
                      <div>{getTime(item.showAt)}</div>
                      <div>
                        {item.filmLanguage} {item.imagery}
                      </div>
                      <div>{formatPrice(item.maxSalePrice)}</div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div className="seating-choose disabled">请先选座</div>
    </>
  );
}
