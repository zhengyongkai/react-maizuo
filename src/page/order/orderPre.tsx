import useFetch from "@/hook/fetch";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { finishOrder, getOrderById } from "@/api/order";
import NavTitle from "@/components/Layout/NavTitle";
import Styles from "@/assets/css/preOrder.module.scss";
import Loading from "@/components/Common/PartLoading";
import SvgIcon from "@/components/SvgIcon/Index";
import { useSelector } from "react-redux";
import { cardInf, cardListInf, user, userState } from "@/types/user";
import { getDate, getDaysNameFn, secondToMMSS } from "@/utils/day";
import { formatPrice } from "@/utils/price";
import { Checkbox, Dialog, Popup } from "antd-mobile";
import { REMAINER } from "@/constant";
import couponImg from "@/assets/img/coupon.png";
import invoiceImg from "@/assets/img/invoice.png";
import balanceImg from "@/assets/img/balance.png";
import { RightOutline } from "antd-mobile-icons";
import useCountDown from "@/hook/countdown";

const initData = {
  cinemaId: 0,
  cinemaName: "",
  showAt: 0,
  endAt: 0,
  hallId: "",
  hallName: "",
  filmId: 0,
  filmName: "",
  scheduleId: 0,
  seatList: [],
  price: 0,
  address: "",
  poster: "",
  cinemaPhone: "",
  orderId: 0,
  status: 0,
  statusName: "",
  oNum: "",
  createDate: 0,
  tradeNo: "",
  tradeTime: 0,
  actualPrice: 0,
};

export default function PreOrder() {
  const navigator = useNavigate();

  const time = useRef<NodeJS.Timeout>();
  const { id = "" } = useParams();
  const [showCard, setShowCard] = useState(false);

  const userCouponData = useSelector<userState, cardListInf[]>(
    (state) => state.user.couponList,
  );

  const userData = useSelector<userState, user>((state) => state.user.userData);

  const [card, setCard] = useState<cardInf>({
    cardList: userCouponData,
  });

  useEffect(() => {
    setCard({
      cardList: userCouponData,
    });
  }, [userCouponData]);

  const userId = useSelector<userState, number>(
    (state) => state.user.userData.userId,
  );

  const [preOrderInfo, loading] = useFetch(getOrderById, +id, initData, [id]);

  const [coupon, setCoupon] = useState<Array<number>>([]);

  const [remainder] = useCountDown(10 * 60, REMAINER, () => {
    Dialog.alert({
      content: "订单已过期，请重新下单",
      onConfirm: () => {
        navigator(-1);
      },
    });
  });

  const price = useMemo(() => {
    const result = coupon.reduce((pre, item) => {
      return pre - item;
    }, preOrderInfo.price);
    // 第一参数是 传给数据库的价格 第二个是实际价格
    return [result, result / 100];
  }, [preOrderInfo.price, coupon]);

  async function onFinishOrder() {
    await finishOrder({
      orderId: preOrderInfo.orderId,
      actualPrice: price[0],
    });
    navigator(`/orderInfo/${preOrderInfo.orderId}`);
  }

  return (
    <>
      <NavTitle back title={preOrderInfo.filmName}>
        <div className={Styles["order-remainder"]}>
          {secondToMMSS(remainder)}
        </div>
      </NavTitle>
      <Loading loading={loading}>
        <div className={Styles["order-wrapper"]}>
          <div className={Styles["order-decoration"]}></div>
          <div className={Styles["order-contact"]}>
            <div>
              <SvgIcon size={36} name="contact"></SvgIcon>
            </div>
            <div>
              <div>{userId}</div>
              <div>温馨提醒：购票信息请查看订单详情，不再发送短信</div>
            </div>
          </div>
          <div className={Styles["order-info-wrapper"]}>
            <div className={Styles["order-poster"]}>
              <img src={preOrderInfo.poster} alt="" />
            </div>
            <div className={Styles["order-info"]}>
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
          <div className={Styles["order-price"]}>
            <div>商品金额</div>
            <div>{formatPrice(preOrderInfo.price)}</div>
          </div>

          <div className={Styles["order-menu-items"]}>
            <div>
              <div
                className={Styles["order-menu-item"]}
                onClick={() => setShowCard(true)}
              >
                <img src={couponImg} alt="" />
                <div>优惠券</div>
                <div>
                  {card.cardList.length}张卷可用<RightOutline></RightOutline>
                </div>
              </div>
              <div className={Styles["order-menu-item"]}>
                <img src={balanceImg} alt="" />
                <div>
                  余额{" "}
                  <span>
                    (剩余{" "}
                    <span className="price-fmt">
                      {formatPrice(userData.balance)}
                    </span>
                    )
                  </span>
                </div>
              </div>
              <div className={Styles["order-menu-item"]}>
                <img src={invoiceImg} alt="" />
                <div>发票</div>
                <div>
                  <RightOutline></RightOutline>
                </div>
              </div>
            </div>
          </div>

          <div className={Styles["order-tips"]}>
            <div>注意事项</div>
            <div>
              <li>
                <div>*</div>
                <div>
                  即日起购票成功后，订座信息不再发送短信，改为公众号通知或App站内通知
                </div>
              </li>
              <li>
                <div>*</div>
                <div>该影城不支持订座票退换，请您确认后再进行购买</div>
              </li>
              <li>
                <div>*</div>
                <div>请确定号码无误，支付成功后将无法修改</div>
              </li>
              <li>
                <div>*</div>
                <div>更多信息请查看影院详情</div>
              </li>
            </div>
          </div>
        </div>
        <div className={Styles["order-bottom"]}>
          <div>
            <span>实付</span>￥{price[1]}
          </div>
          <div onClick={() => onFinishOrder()}>提交订单</div>
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
          {card.cardList.map((item, index) => {
            return (
              <div key={index} className={Styles["order-coupon-item"]}>
                <Checkbox
                  className="adm-checkboxs"
                  disabled={item.isExpia}
                  onChange={(e) => {
                    if (e) {
                      setCoupon([...coupon, item.remission]);
                    } else {
                      const coupons = coupon.splice(index, 1);
                      setCoupon(coupons);
                    }
                  }}
                >
                  <div key={item.couponId} className="order-coupon-wrapper">
                    <div>
                      <div>{item.couponName}</div>
                      <div> {getDate(item.expiration)} 到期</div>
                    </div>
                    <div>{formatPrice(item.remission)}</div>
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
