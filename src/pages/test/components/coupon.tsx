import { cardListInf, userState } from '@/pages/types/user';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavTitle from './navTitle';

import '@/pages/css/coupon.scss';
import { formatPrice } from '@/pages/utils/price';
import { getDate } from '@/pages/utils/day';

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
            return (
              <div
                key={item.couponId}
                className={[
                  'coupon_ticket',
                  item.isExpia ? 'coupon_isExpia' : '',
                ].join(' ')}
              >
                {item.tag ? (
                  <div className="coupon_ticket_tag">{item.tag}</div>
                ) : (
                  <></>
                )}
                <div className="coupon_ticket_body">
                  <div className="coupon_ticket_top">
                    <div>
                      <div className="coupon_ticket_name">
                        {item.couponName}
                      </div>
                      <div className="coupon_ticket_expiration">
                        {getDate(item.expiration)} 到期
                      </div>
                    </div>
                    <div className="coupon_ticket_price">
                      <span>￥</span>
                      {formatPrice(item.remission, false)}
                    </div>
                  </div>

                  <div className="coupon_ticket_bottom">
                    <div>{item.descption}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default couponPage;
