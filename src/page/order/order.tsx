import useFetch from '@/hook/fetch';
import { getOrderByUser } from '@/api/order';
import NavTitle from '@/components/Layout/NavTitle';
import Loading from '@/components/Common/PartLoading';
import Styles from '@/assets/css/order.module.scss';
import { getDaysNameFn } from '@/utils/day';
import { formatPrice } from '@/utils/price';
import { useNavigate } from 'react-router-dom';

import type { preOrderEntity } from '@/types/order';

export default function OrderPage() {
  const [orderList, loading] = useFetch(getOrderByUser, {}, [], []);
  const navigate = useNavigate();

  function onBuyTicket(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: preOrderEntity
  ) {
    e.stopPropagation();
    navigate(`/films/cinemas/${item.filmId}`);
  }
  return (
    <Loading loading={loading}>
      <div>
        <NavTitle
          backFn={() => navigate('/name/my')}
          back
          title={'电影订单'}
        ></NavTitle>
      </div>
      <div className={Styles['order-wrapper']}>
        {orderList.map((item) => {
          return (
            <div
              key={item.oNum}
              className={Styles['order-item']}
              onClick={() => navigate(`/orderInfo/${item.orderId}`)}
            >
              <div className={Styles['order-item-top']}>
                <div className={Styles['order-item-poster']}>
                  <img src={item.poster} alt="" />
                </div>
                <div className={Styles['order-item-info']}>
                  <div>{item.filmName}</div>
                  <div>{getDaysNameFn(item.showAt)}</div>
                  <div>x{item.seatList.length}</div>
                </div>
              </div>
              <div className={Styles['order-item-middle']}>
                <div>共{item.seatList.length}件商品</div>
                <div>
                  实付 <span>{formatPrice(item.actualPrice)}</span>
                </div>
              </div>
              <div
                className={Styles['order-item-bottom']}
                onClick={(e) => onBuyTicket(e, item)}
              >
                <div>{item.statusName}</div>
                <div>再次购买</div>
              </div>
            </div>
          );
        })}
      </div>
    </Loading>
  );
}
