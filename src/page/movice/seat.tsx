import useFetch from '@/hook/fetch';
import { NoticeBar, Toast } from 'antd-mobile';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as d3 from 'd3';
import * as d3Select from 'd3-selection';
import * as d3Zoom from 'd3-zoom';

import { getSeatDetails } from '@/api/seat';

import Unselect from '@/assets/img/unselect.png';
import NavTitle from '@/components/Layout/NavTitle';

import Styles from '@/assets/css/seat.module.scss';
import SvgIcon from '@/components/SvgIcon/Index';
import Seat from '@/components/Common/Seat';
import { getDaysNameFn, getTime } from '@/utils/day';

// import dayjs from "dayjs";
import { getCinemasInfo, getCinemasSchedule, getCinemasSeat } from '@/api/cinema';

import { formatPrice } from '@/utils/price';
import { showDialog } from '@/utils/dialog';

import {
  AXION_MIDDLE_WIDTH,
  COUPLE_SEAT_IS_RIGHT,
  MAXSCALE,
  REMAINER,
  SEAT_DEFAULT_HEIGHT,
  SEAT_DEFAULT_WIDTH
} from '@/constant';

import Loading from '@/components/Common/PartLoading';
import { generatePreOrder } from '@/api/order';
import { getMoviceDetail } from '@/api/movice';

import cookie from '@/utils/cookie';
import { cssCb } from '@/utils/css';

import type { scheduleInf } from '@/types/schedule';
import type {
  seatingChartInf,
  seatListInf,
  seatResponseInf,
  seatsInf,
  selectSeatsInf
} from '@/types/seat';
import type { detailsInf } from '@/types/movice';
import type { cinemasInfoInf } from '@/types/cinema';

const initSeat = {
  schedule: {
    cinema: {
      latitude: 0,
      longitude: 0,
      districtId: 0,
      districtName: '',
      Distance: 0,
      address: '',
      businessTime: '',
      cinemaId: 0,
      cityId: 0,
      cityName: '',
      eTicketFlag: 0,
      gpsAddress: '',
      isVisited: 0,
      logoUrl: '',
      lowPrice: 0,
      name: '',
      notice: '',
      phone: '',
      seatFlag: 0,
      telephones: [],
      district: {
        districtId: 0,
        districtName: ''
      }
    },
    film: {
      filmId: 0,
      name: '',
      category: '',
      synopsis: '',
      poster: '',
      grade: '',
      actors: [],
      runtime: 0,
      nation: '',
      language: ''
    },
    advanceStopMins: 0,
    endAt: 0,
    hall: {
      hallId: '',
      name: ''
    },
    imagery: '',
    isMobileRequiredForLocking: false,
    isOnsell: false,
    lockSeatRulesInf: {
      ruleCheckType: 0,
      rules: []
    },
    maxSeatsCount: 0,
    noticeMsg: '',
    price: {
      market: 0,
      premium: 0,
      sale: 0
    },
    provider: {
      providerId: 0,
      scheduleId: ''
    },
    readNameAuth: {
      authType: 0
    },
    scheduleId: 0,
    sectionPrices: [],
    showAt: 0
  }
};

const initSeats = {
  hall: {
    hallId: '',
    name: '',
    limit: ''
  },
  height: 0,
  width: 0,
  scheduleId: 0,
  seats: []
};

const initDetailsCinemaData = {
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
  showDate: [],
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
  notice: '',
  phone: '',
  seatFlag: 1,
  services: [],
  telephones: [],
  ticketTypes: undefined
};

export default function SeatPage() {
  let screenCtx: any = null;
  let axionYCtx: any = null;
  let seatingChartContext: any = null;
  const navigator = useNavigate();
  const { id = 0, showDate } = useParams();
  const [scheduleList, setScheduleList] = useState<Array<scheduleInf>>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [seatsList, setSeatsList] = useState<seatingChartInf>(initSeats);
  const [scheduleId, setScheduleId] = useState<number>(+id);

  const [seatingChartStyle, setSeatingChartStyle] = useState({
    height: '275px',
    width: '650px'
  });

  const [screenStyle, setScreenStyle] = useState({
    left: '0px'
  });

  const screen = useRef(null);
  const axionY = useRef(null);
  const zoomInstance = useRef<d3Zoom.ZoomBehavior<Element, any>>();
  const map = useRef(null);
  const axionMiddle = useRef<HTMLDivElement>(null);
  const seatingChartContextWrapRef = useRef(null);
  const seatingChartContextWrap = useRef<any>();

  const [selectSeats, setSelectSeats] = useState<Array<selectSeatsInf>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  let [{ schedule }] = useFetch<seatResponseInf>(
    getSeatDetails,
    { scheduleId: scheduleId },
    initSeat,
    [scheduleId]
  );

  let [filmsDetails, setFilmDetails] = useState<detailsInf & cinemasInfoInf>(initDetailsCinemaData);

  useEffect(() => {
    async function fn() {
      const {
        data: { seatingChart }
      } = await getCinemasSeat({
        scheduleId: scheduleId
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
        setLoading(true);
        const {
          data: { schedules }
        } = await getCinemasSchedule({
          filmId: schedule.film.filmId,
          cinemaId: schedule.cinema.cinemaId,
          date: showDate
        });
        const {
          data: { film }
        } = await getMoviceDetail({
          filmId: schedule.film.filmId
        });

        const {
          data: { cinema }
        } = await getCinemasInfo({
          cinemaId: schedule.cinema.cinemaId
        });

        setFilmDetails({ ...film, ...cinema });
        setScheduleList(schedules);
        setScheduleId(schedule.scheduleId);
        setLoading(false);
      } catch {
        showDialog.show({ content: '该场次已经结束' });
      }
    }
    if (schedule.film.filmId && schedule.cinema.cinemaId && showDate) {
      fn();
    }
  }, [schedule.film.filmId, schedule.cinema.cinemaId, showDate]);


  /**
   * @description: 缩放
   * @param {any} event
   * @return {*}
   */  
  function zoom(event: any) {
    // console.log(event);
    seatingChartContext.style(
      'transform',
      'translate(' +
        event.transform.x +
        'px,' +
        event.transform.y +
        'px) scale(' +
        event.transform.k +
        ')'
    );
    seatingChartContext.style(
      '-webkit-transform',
      'translate(' +
        event.transform.x +
        'px,' +
        event.transform.y +
        'px) scale(' +
        event.transform.k +
        ')'
    );

    if (event.transform.k > MAXSCALE) {
      screenCtx.style('transform', `scale(${MAXSCALE})`);
      screenCtx.style('-webkit-transform', `scale(${MAXSCALE})`);
    } else {
      screenCtx.style('transform', `scale(${event.transform.k})`);
      screenCtx.style('-webkit-transform', `scale(${event.transform.k})`);
    }
    axionYCtx.style(
      'transform',
      `translateY(${event.transform.y}px) scale(1, ${event.transform.k})`
    );
    axionYCtx.style(
      '-webkit-transform',
      `translateY(${event.transform.y}px) scale(1, ${event.transform.k})`
    );

    let domArr = axionMiddle.current;
    setTimeout(() => {
      if (domArr) {
        let x = 0;
        x = domArr.getBoundingClientRect().x || domArr.getBoundingClientRect().left;

        setScreenStyle({
          left:
            x -
            ((event.transform.k > MAXSCALE ? MAXSCALE : event.transform.k) * AXION_MIDDLE_WIDTH) /
              2 +
            'px'
        });
      }
    }, 0);
  }

  /**
   * @description: 重新渲染座位
   * @return {*}
   */
  function initSeatComposition() {
    zoomInstance.current = d3Zoom
      .zoom()
      .scaleExtent([1 / 2, 2])
      .on('zoom', zoom);

    screenCtx = d3Select.select(screen.current);
    axionYCtx = d3Select.select(axionY.current);

    seatingChartContextWrap.current = d3Select.select(seatingChartContextWrapRef.current);
    seatingChartContext = d3Select.select(map.current);
    seatingChartContextWrap.current.call(zoomInstance.current);

    const chartWidth = seatsList.width * SEAT_DEFAULT_WIDTH;
    const chartHeight = seatsList.height * SEAT_DEFAULT_HEIGHT;
    setSeatingChartStyle({
      width: chartWidth + 'px',
      height: chartHeight + 'px'
    });
    const currentK = window.innerWidth / chartWidth;
    let t = d3.zoomIdentity.scale(currentK);
    zoomInstance.current.scaleExtent([currentK, 2]);
    zoomInstance.current.transform(seatingChartContextWrap.current, t);
  }

  /**
   * @description: 计算得到行数和列数
   * @return {*}
   */
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


  /**
   * @description: 获取行数和列数进行定位
   * @param {seatsInf} s
   * @return {*}
   */  
  function getSeatPosition(s: seatsInf) {
    const column = s.columnNum;
    const row = s.rowNum;
    if (s.coupleType === COUPLE_SEAT_IS_RIGHT) {
      return {
        display: 'none'
      };
    }
    return {
      left: (+column - 1) * SEAT_DEFAULT_WIDTH + 'px',
      top: (+row - 1) * SEAT_DEFAULT_HEIGHT + 'px'
    };
  }

  /**
   * @description: 双击可以方法
   * @param {React} ev
   * @param {*} MouseEvent
   * @return {*}
   */  
  const onSelectZoom = (ev: React.MouseEvent<any, MouseEvent>) => {
    const transform = d3.zoomTransform(seatingChartContextWrap.current.node());
    if (transform.k >= 2) {
      return;
    }
    const event = new MouseEvent('dblclick', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: ev.pageX,
      clientY: ev.pageY
    });
    setTimeout(() => {
      ev.target.dispatchEvent(event);
      d3.zoomTransform(seatingChartContextWrap.current.node());
    }, 10);
  };



  /**
   * @description: 优化函数重新渲染问题 防止 zoom 和 移动时出现子组件不断渲染的问题
   * @return {*}
   */  
  const onSelectSeats = useCallback(
    (item: seatsInf, ev: React.MouseEvent<any, MouseEvent>) => {
      onSelectZoom(ev);
      // 选中以及反选
      let selected: selectSeatsInf = {
        columnId: item.columnId,
        columnNum: item.columnNum,
        rowId: item.rowId,
        rowNum: item.rowNum,
        sectionId: item.sectionId,
        sectionName: item.sectionName,
        scheduleId: schedule.scheduleId,
        date: schedule.showAt,
        cinemaId: schedule.cinema.cinemaId
      };
      let result = [];
      let isSelect = selectSeats.filter(
        (res) => res.columnId === item.columnId && res.rowId === item.rowId
      );
      if (isSelect[0]) {
        result = selectSeats.filter((res) => {
          return res.columnId !== item.columnId || res.rowId !== item.rowId;
        });
      } else {
        if (selectSeats.length === 5) {
          return Toast.show('不能选择超过五个座位哦~');
        }
        result = [...selectSeats, selected];
      }

      setSelectSeats(result);
    },
    [selectSeats]
  );

  /**
   * @description: 是否已经选择
   * @return {*}
   */  
  const isSelect = useMemo(
    () => (item: seatsInf) => {
      const flag = selectSeats.filter((res) => {
        return res.columnId === item.columnId && res.rowId === item.rowId;
      })[0];
      return flag ? true : false;
    },
    [selectSeats]
  );

  /**
   * @description: 选择排版 清空作为列表
   * @param {number} id
   * @return {*}
   */  
  function setSchedule(id: number) {
    if (id === scheduleId) {
      return false;
    }
    setSelectSeats([]);
    setScheduleId(id);
  }

  /**
   * @description: 删除选中得作为
   * @param {number} index
   * @return {*}
   */  
  function removeSeats(index: number) {
    let result = [...selectSeats];
    result.splice(index, 1);
    setSelectSeats(result);
  }

  /**
   * @description: 预生成订单
   * @return {*}
   */ 
  async function onGeneratePreOrder() {
    if (!selectSeats.length) {
      return;
    }
    // console.log(schedule);
    cookie.removeCookie(REMAINER);

    setLoading(true);
    let { data } = await generatePreOrder({
      cinemaId: schedule.cinema.cinemaId,
      cinemaName: schedule.cinema.name,
      showAt: schedule.showAt,
      endAt: schedule.endAt,
      hallId: schedule.hall.hallId,
      hallName: schedule.hall.name,
      filmId: schedule.film.filmId,
      filmName: schedule.film.name,
      seatList: selectSeats,
      scheduleId: scheduleId,
      price: +totalPrice * 100,
      address: filmsDetails.address,
      poster: filmsDetails.poster,
      cinemaPhone: filmsDetails.phone
    });
    setLoading(false);
    Toast.show('订单生成成功，请尽快确认');
    navigator(`/preorder/${data}`);
  }

  /**
   * @description: 价格计算
   * @param {*} useMemo
   * @return {*}
   */  
  const totalPrice = useMemo(() => {
    // console.log(selectSeats.length * schedule.price.sale);
    return formatPrice(selectSeats.length * schedule.price.sale, false);
  }, [selectSeats]);

  return (
    <>
      <div>
        <NavTitle title={schedule.cinema.name} back></NavTitle>
      </div>
      <div className={Styles['seating-chair']}>
        <NoticeBar content={schedule.noticeMsg} color="alert"></NoticeBar>
      </div>
      <Loading loading={loading}>
        <div>
          <div ref={seatingChartContextWrapRef} className={Styles['seating-chart-wrap']}>
            <div style={{ ...seatingChartStyle }}>
              <div className={Styles['seating-screen']} ref={screen} style={{ ...screenStyle }}>
                {schedule.hall.name}
              </div>
              <div className={Styles['axion-y']} ref={axionY}>
                {[...new Array(rowNum)].map((res, index) => {
                  return (
                    <div className={Styles['rowName']} key={index}>
                      {index + 1}
                    </div>
                  );
                })}
              </div>
              <div className={Styles['map']} ref={map}>
                <div
                  className={Styles['axion-middle']}
                  style={{ height: rowNum * 25 }}
                  ref={axionMiddle}></div>
                <div className={Styles['seats']}>
                  {seatsList.seats.map((item, index) => {
                    return (
                      <div className={Styles['seat']} style={getSeatPosition(item)} key={index}>
                        <Seat
                          data={item}
                          onSelect={onSelectSeats}
                          selecteds={isSelect(item)}></Seat>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Loading>
      <div>
        <div className={Styles['seating-tips']}>
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

        <div className={Styles['seating-chosing']}>
          <div>
            <div className={Styles['seating-name']}>
              <div>{schedule.film.name}</div>
              <div onClick={() => setShowSchedule(!showSchedule)}>
                {showSchedule ? '收起场次' : '展开场次'}
              </div>
            </div>
            <div className={Styles['seating-info']}>
              {getDaysNameFn(schedule.showAt, true)} {schedule.film.language} {schedule.imagery}
            </div>
          </div>

          <div className={cssCb([Styles['seating-schedule'], 'inner-scroll'])}>
            {showSchedule
              ? scheduleList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={scheduleId === item.scheduleId ? Styles['active'] : ''}
                      onClick={() => setSchedule(item.scheduleId)}>
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
          <div className={cssCb([Styles['selects-wraps'], 'inner-scroll'])}>
            {selectSeats.map((res, index) => {
              return (
                <div className={Styles['selects-wraps-item']} key={index}>
                  <div>
                    {res.rowNum}排{res.columnNum}座
                  </div>
                  <div>
                    <div>{formatPrice(schedule.price.sale)} </div>
                    <div>
                      <img src={Unselect} onClick={() => removeSeats(index)} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={cssCb([Styles['seating-choose'], selectSeats.length ? '' : Styles['disabled']])}
        onClick={onGeneratePreOrder}>
        {selectSeats.length ? <>共￥{totalPrice},确认选座</> : <>请先选座</>}
      </div>
    </>
  );
}
