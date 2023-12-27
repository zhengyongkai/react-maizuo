import useFetch from '@/hook/fetch';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../api/order';
import NavTitle from './components/navTitle';
import decorator from '@/assets/img/decorator.png';
import '@/pages/css/preOrder.scss';
import Loading from './components/loading';
import SvgIcon from '@/components/SvgIcon';
import { useSelector } from 'react-redux';
import { user, userState } from '../types/user';
import { getDaysNameFn, secondToMMSS } from '../utils/day';
import { formatPrice } from '../utils/price';
import { Dialog } from 'antd-mobile';

const initData = {
  cinemaId: 0,
  cinemaName: '',
  showAt: 0,
  endAt: 0,
  hallId: 0,
  hallName: '',
  filmId: 0,
  filmName: '',
  scheduleId: 0,
  seatList: [],
  price: 0,
  address: '',
  poster: '',
};

export default function preOrder() {
  const navigator = useNavigate();
  const seconds = useRef(10 * 60);
  const [remainder, setRemainder] = useState(seconds.current);
  const time = useRef<NodeJS.Timeout>();
  const { id } = useParams();

  const userId = useSelector<userState, number>(
    (state) => state.user.userData.userId
  );

  const [preOrderInfo, loading] = useFetch(
    () => {
      return getOrderById(Number(id));
    },
    initData,
    [id]
  );

  useEffect(() => {
    time.current = setInterval(() => {
      if (seconds.current === 0) {
        clearInterval(time.current);
        Dialog.alert({
          content: '订单已过期，请重新下单',
          onConfirm: () => {
            navigator(-1);
          },
        });
        return;
      }
      seconds.current--;
      setRemainder(seconds.current);
    }, 1000);
    return () => {
      clearInterval(time.current);
    };
  }, []);

  return (
    <>
      <NavTitle back title={preOrderInfo.filmName}>
        <div className="order-remainder">{secondToMMSS(remainder)}</div>
      </NavTitle>
      <Loading loading={loading}>
        <div className="order-wrapper">
          <div className="order-decoration"></div>
          <div className="order-contact">
            <div>
              <SvgIcon size={36} name="contact"></SvgIcon>
            </div>
            <div>
              <div>{userId}</div>
              <div>温馨提醒：购票信息请查看订单详情，不再发送短信</div>
            </div>
          </div>
          <div className="order-info-wrapper">
            <div className="order-poster">
              <img src={preOrderInfo.poster} alt="" />
            </div>
            <div className="order-info">
              <div>{preOrderInfo.filmName}</div>
              <div>{getDaysNameFn(preOrderInfo.showAt)}</div>
              <div>{preOrderInfo.cinemaName}</div>
              <div>
                <span>{preOrderInfo.hallName}</span>
                {preOrderInfo.seatList.map((item, index) => {
                  return (
                    <span key={index}>
                      {item.rowNum + '排' + (item.columnNum + '') + '座 '}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="order-price">
            <div>商品金额</div>
            <div>{formatPrice(preOrderInfo.price)}</div>
          </div>
        </div>
      </Loading>
    </>
  );
}
