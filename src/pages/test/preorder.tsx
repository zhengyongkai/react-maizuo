import useFetch from '@/hook/fetch';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../api/order';
import NavTitle from './components/navTitle';
import decorator from '@/assets/img/decorator.png';
import '@/pages/css/preOrder.scss';
import Loading from './components/loading';
import SvgIcon from '@/components/SvgIcon';
import { useSelector } from 'react-redux';
import { user, userState } from '../types/user';

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
  districtName: '',
  poster: '',
};

export default function preOrder() {
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

  return (
    <>
      <NavTitle back title={preOrderInfo.filmName}></NavTitle>
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
        </div>
      </Loading>
    </>
  );
}
