import type { cardListInf, userState } from "@/types/user";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavTitle from "@/components/Layout/NavTitle";

import Styles from "@/assets/css/coupon.module.scss";

import CouponItem from "@/components/Common/CouponItem";

function couponPage() {
  const [couponList, setCouponList] = useState<cardListInf[]>([]);

  const userCouponData = useSelector<userState, cardListInf[]>(
    (state) => state.user.couponList
  );

  useEffect(() => {
    setCouponList(userCouponData);
  }, [userCouponData]);

  return (
    <>
      <div>
        <NavTitle back title={"优惠券"}></NavTitle>
      </div>
      <div className={Styles["coupon_tickets"]}>
        <div>
          {couponList.map((item) => {
            return <CouponItem item={item} key={item.couponId}></CouponItem>;
          })}
        </div>
      </div>
    </>
  );
}

export default couponPage;
