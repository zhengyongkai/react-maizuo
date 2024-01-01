import useFetch from '@/hook/fetch';
import { getOrderByUser } from '@/pages/api/order';
import NavTitle from './components/navTitle';
import Loading from './components/partLoading';
import '@/pages/css/order.scss';
import { getDaysNameFn } from '@/pages/utils/day';
import { formatPrice } from '@/pages/utils/price';
import { useNavigate } from 'react-router-dom';

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
      <div className="order-wrapper">
        {orderList.map((item) => {
          return (
            <div
              className="order-item"
              onClick={() => navigate(`/orderInfo/${item.orderId}`)}
            >
              <div className="order-item-top">
                <div className="order-item-poster">
                  <img src={item.poster} alt="" />
                </div>
                <div className="order-item-info">
                  <div>{item.filmName}</div>
                  <div>{getDaysNameFn(item.showAt)}</div>
                  <div>x{item.seatList.length}</div>
                </div>
              </div>
              <div className="order-item-middle">
                <div>共{item.seatList.length}件商品</div>
                <div>
                  实付 <span>{formatPrice(item.price)}</span>
                </div>
              </div>
              <div className="order-item-bottom">
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
