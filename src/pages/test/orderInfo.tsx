import useFetch from '@/hook/fetch';
import NavTitle from './components/navTitle';
import { getOrderById, payOrder } from '../api/order';
import { useParams } from 'react-router-dom';
import Loading from './components/partLoading';
import orderBg from '@/assets/img/order_bg.png';
import '@/pages/css/order_info.scss';
import SvgIcon from '@/components/SvgIcon';
import OrderCardImg from '@/assets/img/order_card.png';
import useCountDown from '@/hook/countdown';
import { getDaysNameFn, secondToMMSS } from '../utils/day';
import { useSelector } from 'react-redux';
import { user, userState } from '../types/user';
import { formatPrice } from '../utils/price';
import phoneImg from '@/assets/img/phone.png';
import CopyText from './components/copyText';
import { Checkbox, Radio } from 'antd-mobile';
import { useRef, useState } from 'react';

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
  createDate: '',
  tradeNo: '',
};

function OrderInfoPage() {
  const payRef = useRef<HTMLDivElement>(null);
  const { id = '' } = useParams();
  const [orderInfo, loading] = useFetch(
    () => {
      return getOrderById(+id);
    },
    initData,
    [id]
  );

  const [remainer] = useCountDown(60 * 15);

  const userData = useSelector<userState, user>((state) => state.user.userData);

  async function pay() {
    const { data } = await payOrder({
      oNum: orderInfo.oNum,
      price: +formatPrice(orderInfo.price, false),
      subject: orderInfo.filmName + '(' + orderInfo.seatList.length + '张)',
      orderId: orderInfo.orderId,
    });

    // return;

    setTimeout(() => {
      if (payRef.current) {
        payRef.current.innerHTML = data;
        document.getElementsByTagName('form')[0].submit();
      }
    }, 500);
  }

  return (
    <Loading loading={loading}>
      <NavTitle title={orderInfo.filmName} back></NavTitle>
      <div className="order-info-wrapper">
        <div className="order-info-status">
          <div>
            <div>{orderInfo.statusName}</div>
            <div>剩余时间：{secondToMMSS(remainer)}</div>
          </div>

          <div>
            <img src={OrderCardImg} alt="" />
          </div>
        </div>
        <div className="order-info-user">
          <div>
            <SvgIcon name="order_contact" size={32}></SvgIcon>
          </div>
          <div>{userData.userId}</div>
        </div>
        <div className="order-info-wrapper">
          <div className="order-poster">
            <img src={orderInfo.poster} alt="" />
          </div>
          <div className="order-info">
            <div>{orderInfo.filmName}</div>
            <div>{getDaysNameFn(orderInfo.showAt)}</div>
            <div>{orderInfo.address}</div>
            <div>
              <span>
                {orderInfo.hallName}({orderInfo.seatList.length}张)
              </span>
              {orderInfo.seatList.map((item, index) => {
                return (
                  <span key={index}>
                    {item.rowNum + '排' + (item.columnNum + '') + '座 '}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="order-price-wrapper">
          <div className="order-price">
            <div>商品金额</div>
            <div>{formatPrice(orderInfo.price)}</div>
          </div>
          <div className="order-external-price">
            <div>实付</div>
            <div>{formatPrice(orderInfo.price)}</div>
          </div>
        </div>

        <div className="order-locate-wrapper">
          <div className="order-locate">
            <div>{orderInfo.cinemaName}</div>
            <div>{orderInfo.address}</div>
          </div>
          <div className="order-tel">
            <a href={'tel:' + orderInfo.cinemaPhone}>
              <img src={phoneImg} alt="" />
            </a>
          </div>
        </div>
        <div className="order-detailed-wrapper">
          <div>
            <div>订单编号 {orderInfo.oNum}</div>
            <div>
              <CopyText text={orderInfo.oNum}>
                <span>复制</span>
              </CopyText>
            </div>
          </div>
          <div>下单时间 {orderInfo.createDate}</div>
        </div>
        <div className="order-pay">
          <div>支付方式</div>
          <Radio.Group>
            <Radio value={'1'}>支付宝</Radio>
          </Radio.Group>
        </div>
        <div className="order-info-bottom">
          <div>
            <SvgIcon name="custom" size={30}></SvgIcon>
          </div>
          <div onClick={pay}>立即支付</div>
        </div>
      </div>
      <div ref={payRef}></div>
    </Loading>
  );
}

export default OrderInfoPage;
