// import Styles from '@/assets/css/movice.module.scss';
import { memo } from 'react';

import type { detailsInf } from '@/types/movice';
import { useNavigate } from 'react-router-dom';
// import { cssCb } from '@/utils/css';

interface propsInf {
  item: detailsInf;
  type: Number;
}

function MoviceItem(props: propsInf) {
  const navigate = useNavigate();
  let { item } = props;

  /**
   * @description: 跳转到影院详情页
   * @param {number} filemId
   * @return {*}
   */
  function onNavigateTo(filemId: number) {
    navigate(`/films/${filemId}`);
  }

  /**
   * @description: 跳转到影院列表页
   * @return {*}
   */
  function onBuyTickets() {
    navigate(`/films/cinemas/${item.filmId}`);
  }
  return (
    <div bg-white flex h-124 p-16 items-center box-border>
      <div mr-12 onClick={() => onNavigateTo(item.filmId)}>
        <img w-66 h-94 src={item.poster} alt="" />
      </div>
      <div bg-white overflow-hidden flex-1>
        <div text-black flex items-center height-22 leading-22 mr-5 text-16 overflow-hidden>
          <div truncate mr-7>
            {item.name}{' '}
          </div>{' '}
          <span
            text-white
            text-9
            text-center
            bg-slate-50
            h-14
            leading-14
            px-2
            rounded-2
            inline-block
            w-20>
            {item.filmType.name}
          </span>
        </div>
        {item.grade ? (
          <div text-13 mt-4 text-grey-50>
            观众评分{' '}
            <span text-yellow-50 text-14>
              {item.grade}
            </span>{' '}
          </div>
        ) : undefined}
        <div truncate text-13 mt-4 text-grey-50>
          {item.actors &&
            item.actors.map((anctor, index) => {
              return <span key={index}>{anctor.name} </span>;
            })}
        </div>
        <div text-13 mt-4 text-grey-50>
          <span>{item.nation}</span>
          <span mx-2>|</span>
          <span>{item.runtime} 分钟</span>
        </div>
      </div>
      <div>
        {props.type === 1 ? (
          <span
            onClick={onBuyTickets}
            inline-block
            text-center
            leading-25
            h-25
            w-50
            text-yellow-50
            text-13
            rounded-2
            border-1
            border-yellow-50
            border-solid>
            购票
          </span>
        ) : item.isPresale ? (
          <span
            onClick={onBuyTickets}
            inline-block
            text-center
            leading-25
            h-25
            w-50
            text-yellow-50
            text-13
            rounded-2
            border-1
            border-yellow-50
            border-solid>
            预购
          </span>
        ) : undefined}
      </div>
    </div>
  );
}

export default memo(MoviceItem);
