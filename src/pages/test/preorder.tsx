import useFetch from "@/hook/fetch";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../api/order";
import NavTitle from "./components/navTitle";
import decorator from "@/assets/img/decorator.png";
import "@/pages/css/preOrder.scss";
import Loading from "./components/loading";
import SvgIcon from "@/components/SvgIcon";
import { useSelector } from "react-redux";
import { cardInf, cardListInf, user, userState } from "../types/user";
import { getDaysNameFn, secondToMMSS } from "../utils/day";
import { formatPrice } from "../utils/price";
import { Checkbox, Dialog, Popup } from "antd-mobile";
import { REMAINER } from "@/store/constants";
import cookie from "@/pages/utils/cookie";
import couponImg from "@/assets/img/coupon.png";
import { RightOutline } from "antd-mobile-icons";

const initData = {
  cinemaId: 0,
  cinemaName: "",
  showAt: 0,
  endAt: 0,
  hallId: 0,
  hallName: "",
  filmId: 0,
  filmName: "",
  scheduleId: 0,
  seatList: [],
  price: 0,
  address: "",
  poster: "",
};

export default function preOrder() {
  const navigator = useNavigate();
  const seconds = useRef(cookie.getCookie(REMAINER) || 10 * 60);
  const [remainder, setRemainder] = useState(seconds.current);
  const time = useRef<NodeJS.Timeout>();
  const { id } = useParams();
  const [showCard, setShowCard] = useState(false);

  const userCouponData = useSelector<userState, cardListInf[]>(
    (state) => state.user.couponList
  );

  const [card, setCard] = useState<cardInf>({
    cardList: userCouponData,
  });

  useEffect(() => {
    setCard({
      cardList: userCouponData,
    });
  }, [userCouponData]);

  const userId = useSelector<userState, number>(
    (state) => state.user.userData.userId
  );

  const [preOrderInfo, loading] = useFetch(
    () => {
      return getOrderById(Number(id));
    },
    initData,
    [id]
  );

  const [coupon, setCoupon] = useState<Array<number>>([]);

  useEffect(() => {
    time.current = setInterval(() => {
      if (seconds.current === 0) {
        clearInterval(time.current);
        Dialog.alert({
          content: "订单已过期，请重新下单",
          onConfirm: () => {
            navigator(-1);
          },
        });
        return;
      }
      seconds.current--;
      setRemainder(seconds.current);
      cookie.setCookie(REMAINER, seconds.current);
    }, 1000);
    return () => {
      clearInterval(time.current);
      // cookie.removeCookie(REMAINER);
    };
  }, []);

  const price = useMemo(() => {
    const result = coupon.reduce((pre, item) => {
      return pre - item;
    }, preOrderInfo.price);
    return formatPrice(result);
  }, [preOrderInfo.price, coupon]);

  return (
    <>
      <NavTitle back title={preOrderInfo.filmName}>
        <div className="order-remainder">{secondToMMSS(remainder)}</div>
      </NavTitle>
      <Loading loading={loading}>
        <div className="order-wrapper">
          <div className="order-decoration"></div>
          <div className="order-contact">
            <div>
              <SvgIcon size={36} name="contact"></SvgIcon>
            </div>
            <div>
              <div>{userId}</div>
              <div>温馨提醒：购票信息请查看订单详情，不再发送短信</div>
            </div>
          </div>
          <div className="order-info-wrapper">
            <div className="order-poster">
              <img src={preOrderInfo.poster} alt="" />
            </div>
            <div className="order-info">
              <div>{preOrderInfo.filmName}</div>
              <div>{getDaysNameFn(preOrderInfo.showAt)}</div>
              <div>{preOrderInfo.cinemaName}</div>
              <div>
                <span>{preOrderInfo.hallName}</span>
                {preOrderInfo.seatList.map((item, index) => {
                  return (
                    <span key={index}>
                      {item.rowNum + "排" + (item.columnNum + "") + "座 "}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="order-price">
            <div>商品金额</div>
            <div>{formatPrice(preOrderInfo.price)}</div>
          </div>

          <div className="order-coupon">
            <div>
              <div
                className="order-menu-item"
                onClick={() => setShowCard(true)}
              >
                <img src={couponImg} alt="" />
                <div>优惠券</div>
                <div>
                  {card.cardList.length}张卷可用<RightOutline></RightOutline>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-bottom">
          <div>
            <span>实付</span>
            {price}
          </div>
          <div>提交订单</div>
        </div>
      </Loading>
      <Popup
        visible={showCard}
        closeOnMaskClick={true}
        onMaskClick={() => setShowCard(false)}
      >
        <Checkbox.Group
          value={coupon}
          onChange={(val) => {
            setCoupon(val as number[]);
          }}
        >
          {card.cardList.map((item) => {
            return (
              <div>
                <Checkbox
                  onChange={(e) => {
                    console.log(item.remission);
                    e && setCoupon([...coupon, item.remission]);
                  }}
                >
                  <div key={item.couponId}>
                    <>{item.couponName}</>
                  </div>
                </Checkbox>
              </div>
            );
          })}
        </Checkbox.Group>
      </Popup>
    </>
  );
}
