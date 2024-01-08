import type { cardListInf, userState } from '@/types/user';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavTitle from './navTitle';

import '@/assets/css/coupon.scss';

import CouponItem from './couponItem';

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
        <NavTitle back title={'优惠券'}></NavTitle>
      </div>
      <div className="coupon_tickets">
        <div>
          {couponList.map((item) => {
            return <CouponItem item={item}></CouponItem>;
          })}
        </div>
      </div>
    </>
  );
}

export default couponPage;
