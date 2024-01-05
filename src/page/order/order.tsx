import useFetch from '@/hook/fetch';
import { getOrderByUser } from '@/api/order';
import NavTitle from '@/components/Common/navTitle';
import Loading from '@/components/Common/partLoading';
import Styles from '@/assets/css/order.module.scss';
import { getDaysNameFn } from '@/utils/day';
import { formatPrice } from '@/utils/price';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const orderPage = () => {
  const [orderList, loading] = useFetch(async () => getOrderByUser(), [], []);
  const navigate = useNavigate();
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
              key={item.cinemaId}
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
                  实付 <span>{formatPrice(item.price)}</span>
                </div>
              </div>
              <div className={Styles['order-item-bottom']}>
                <div>{item.statusName}</div>
                <div>再次购买</div>
              </div>
            </div>
          );
        })}
      </div>
    </Loading>
  );
};

export default orderPage;
