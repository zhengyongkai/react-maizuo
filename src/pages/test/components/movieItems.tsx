import '@/pages/css/movice.scss';
import { memo } from 'react';

import type { moviceImf } from '@/pages/types/movice';
import { useNavigate } from 'react-router-dom';

interface propsImf {
  item: moviceImf;
}

function moviceItem(props: propsImf) {
  const navigate = useNavigate();
  let { item } = props;

  function onNavigateTo(filemId: number) {
    navigate(`/films/${filemId}`);
  }

  return (
    <div className="movice-item">
      <div className="movice-poster" onClick={() => onNavigateTo(item.filmId)}>
        <img src={item.poster} alt="" />
      </div>
      <div className="movice-content">
        <div className="movice-name">{item.name}</div>
        <div className="movice-grade">
          观众评分 <span>{item.grade}</span>{' '}
        </div>
        <div className="movice-anctor text-ellipsis">
          {item.actors.map((anctor, index) => {
            return <span key={index}>{anctor.name} </span>;
          })}
        </div>
        <div className="movice-tips">
          <span>{item.nation}</span>
          <span>|</span>
          <span>{item.runtime}</span>
        </div>
      </div>
      <div>
        <span>购票</span>
      </div>
    </div>
  );
}

export default memo(moviceItem);
