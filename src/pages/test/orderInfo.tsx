import useFetch from '@/hook/fetch';
import NavTitle from './components/navTitle';
import { getOrderById } from '../api/order';
import { useParams } from 'react-router-dom';
import Loading from './components/partLoading';
import orderBg from '@/assets/img/order_bg.png';
import '@/pages/css/order_info.scss';
import SvgIcon from '@/components/SvgIcon';
import OrderCardImg from '@/assets/img/order_card.png';
import useCountDown from '@/hook/countdown';
import { secondToMMSS } from '../utils/day';

const initData = {
  cinemaId: 0,
  cinemaName: '',
  showAt: 0,
  endAt: 0,
  hallId: '',
  hallName: '',
  filmId: 0,
  filmName: '',
  scheduleId: 0,
  seatList: [],
  price: 0,
  address: '',
  poster: '',
  cinemaPhone: '',
  orderId: 0,
  status: 0,
  statusName: '',
  oNum: '',
};

function OrderInfoPage() {
  const { id = '' } = useParams();
  const [orderInfo, loading] = useFetch(
    () => {
      return getOrderById(+id);
    },
    initData,
    [id]
  );

  const [remainer] = useCountDown(60 * 15);

  return (
    <Loading loading={loading}>
      <NavTitle title={orderInfo.filmName} back></NavTitle>
      <div className="order_info_wrapper">
        <div className="order_info_status">
          <div>
            <div>{orderInfo.statusName}</div>
            <div>剩余时间：{secondToMMSS(remainer)}</div>
          </div>

          <div>
            <img src={OrderCardImg} alt="" />
          </div>
        </div>
      </div>
    </Loading>
  );
}

export default OrderInfoPage;
