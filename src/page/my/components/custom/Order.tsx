import { messageInf, orderInf, selectedInf } from '@/types/chat';
import Styles from './css/chatItem.module.scss';
import { useNavigate } from 'react-router-dom';

function orderChat(props: { data: orderInf }) {
  const navigator = useNavigate();

  let {
    data: { title, date, fromId, from, data }
  } = props;

  return (
    <div className={Styles['order-item-wrapper']}>
      <div className={Styles['order-item-title']}>{title}</div>
      <div className={Styles['order-item-content']}>
        <ul>
          <li>
            <div>单号</div> <div>{data.oNum}</div>
          </li>
          <li>
            <div>状态</div> <div>{data.statusName}</div>
          </li>
          <li>
            <div>链接</div>
            <div onClick={() => navigator(`/orderInfo/${data.orderId}`)}>点击链接</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default orderChat;
