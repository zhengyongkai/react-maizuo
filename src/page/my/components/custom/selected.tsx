import type { messageInf, selectedInf } from '@/types/chat';
import Styles from './css/chatItem.module.scss';

function SelectedChat(props: {
  data: selectedInf;
  onChange: (id: string, value: string) => void;
}) {
  let {
    data: { title, date, fromId, from, data },
    onChange,
  } = props;
  return (
    <div className={Styles['select-item-wrapper']}>
      <div className={Styles['select-item-title']}>{title}</div>
      <div className={Styles['select-item-items']}>
        {data?.map((item, index) => {
          return (
            <div key={index} onClick={() => onChange(item.id, item.title)}>
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectedChat;
