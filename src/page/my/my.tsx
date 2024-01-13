import type {
  amountInf,
  cardInf,
  cardListInf,
  user,
  userState,
} from "@/types/user";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { formatPrice } from "@/utils/price";

import Styles from "@/assets/css/my.module.scss";

import orderImg from "@/assets/img/order.png";
import packetImg from "@/assets/img/packet.png";
import historyImg from "@/assets/img/history.png";
import customImg from "@/assets/img/custom.png";
import settingImg from "@/assets/img/setting.png";
import { RightOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

export default function myPage() {
  const navigate = useNavigate();

  const userData = useSelector<userState, user>((state) => state.user.userData);
  const userCouponData = useSelector<userState, cardListInf[]>(
    (state) => state.user.couponList
  );
  const [card, setCard] = useState<cardInf & amountInf>({
    cardList: userCouponData,
    availableAmount: 0,
    frozenAmount: 0,
    totalAmount: 0,
  });

  const menus = [
    {
      img: orderImg,
      title: "电影订单",
      url: "/order",
    },
    {
      img: customImg,
      title: "帮助与客服",
      url: "/custom",
    },
    {
      img: settingImg,
      title: "设置",
      url: "/setting",
    },
  ];

  useEffect(() => {
    setCard({
      ...card,
      cardList: userCouponData,
    });
  }, [userCouponData]);

  function login() {
    navigate("/login");
  }
  return (
    <>
      <div className={Styles["user-bg"]}>
        {userData.userId ? (
          <>
            <div className={Styles["user-headerIcon"]}>
              <img src={userData.headIcon} alt="" />
            </div>
            <div className={Styles["user-nickName"]}>{userData.nickName}</div>
          </>
        ) : (
          <div onClick={login}>请先登录</div>
        )}
      </div>
      <div className={Styles["user-card"]}>
        <div onClick={() => navigate("/coupon")}>
          <div>{card.cardList.length}张</div>
          <div>优惠卷</div>
        </div>
        <div>
          <div>{formatPrice(userData.balance)}</div>
          <div>余额</div>
        </div>
      </div>
      <div className={Styles["user-menu-items"]}>
        {menus.map((item, key) => {
          return (
            <div
              className={Styles["user-menu-item"]}
              key={key}
              onClick={() => navigate(item.url)}
            >
              <img src={item.img} alt="" />
              <div>{item.title}</div>
              <RightOutline></RightOutline>
            </div>
          );
        })}
      </div>
    </>
  );
}
