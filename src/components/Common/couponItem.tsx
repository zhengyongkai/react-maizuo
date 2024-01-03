import { cardListInf } from "@/types/user";
import { getDate } from "@/utils/day";
import { formatPrice } from "@/utils/price";

import "@/assets/css/couponItem.scss";

interface propsInf {
  item: cardListInf;
}

export default function CouponItem(props: propsInf) {
  const { item } = props;
  return (
    <div
      key={item.couponId}
      className={["coupon_ticket", item.isExpia ? "coupon_isExpia" : ""].join(
        " "
      )}
    >
      {item.tag ? <div className="coupon_ticket_tag">{item.tag}</div> : <></>}
      <div className="coupon_ticket_body">
        <div className="coupon_ticket_top">
          <div>
            <div className="coupon_ticket_name">{item.couponName}</div>
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
}
