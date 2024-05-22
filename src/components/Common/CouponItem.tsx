import type { cardListInf } from '@/types/user';
import { getDate } from '@/utils/day';
import { formatPrice } from '@/utils/price';

import Styles from '@/assets/css/couponItem.module.scss';
import { cssCb } from '@/utils/css';

interface propsInf {
  item: cardListInf;
}

export default function CouponItem(props: propsInf) {
  const { item } = props;
  return (
    <div
      key={item.couponId}
      className={cssCb([Styles['coupon_ticket'], item.isExpia ? Styles['coupon_isExpia'] : ''])}>
      {item.tag ? <div className={Styles['coupon_ticket_tag']}>{item.tag}</div> : <></>}
      <div className={Styles['coupon_ticket_body']}>
        <div className={Styles['coupon_ticket_top']}>
          <div>
            <div className={Styles['coupon_ticket_name']}>{item.couponName}</div>
            <div className={Styles['coupon_ticket_expiration']}>
              {getDate(item.expiration)} 到期
            </div>
          </div>
          <div className={Styles['coupon_ticket_price']}>
            <span>￥</span>
            {formatPrice(item.remission, false)}
          </div>
        </div>

        <div className={Styles['coupon_ticket_bottom']}>
          <div>{item.descption}</div>
        </div>
      </div>
    </div>
  );
}
