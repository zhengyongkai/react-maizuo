import { amountInf, cardInf, user, userState } from "@/pages/types/user";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { getCardAmount, getCardList } from "@/pages/api/user";
import { formatPrice } from "@/pages/utils/price";

import "@/pages/css/user.scss";

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
  const [card, setCard] = useState<cardInf & amountInf>({
    availableBalance: 0,
    cardsCount: 0,
    couponCount: 0,
    deliveryOrderCount: 0,
    payOrderCount: 0,
    receiveGoodsCount: 0,
    availableAmount: 0,
    frozenAmount: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    async function fn() {
      // let { data } = await getCardList();
      // let { data: cardMount } = await getCardAmount();
      // setCard({
      //   ...data,
      //   ...cardMount,
      // });
    }
    // console.log("dd", userData);
    if (userData.userId) {
      fn();
    }
  }, [userData.userId]);

  const menus = [
    {
      img: orderImg,
      title: "电影订单",
      url: "/order",
    },
    {
      img: packetImg,
      title: "组合红包",
      url: "/order",
    },
    {
      img: historyImg,
      title: "历史记录",
      url: "/order",
    },
    {
      img: customImg,
      title: "帮助与客服",
      url: "/order",
    },
    {
      img: settingImg,
      title: "设置",
      url: "/order",
    },
  ];

  return (
    <>
      <div className="user-bg">
        {userData.userId ? (
          <>
            <div>
              <img src={userData.headIcon} alt="" />
            </div>
            <div>{userData.nickName}</div>
          </>
        ) : (
          "请先登录"
        )}
      </div>
      <div className="user-card">
        <div>
          <div>{card.cardsCount}张</div>
          <div>卖座卷</div>
        </div>
        <div>
          <div>{formatPrice(card.availableAmount)}</div>
          <div>余额</div>
        </div>
      </div>
      <div className="user-menu-items">
        {menus.map((item, key) => {
          return (
            <div
              className="user-menu-item"
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
