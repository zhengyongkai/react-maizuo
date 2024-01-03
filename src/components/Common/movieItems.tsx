import "@/assets/css/movice.scss";
import { memo } from "react";

import type { detailsImf } from "@/types/movice";
import { useNavigate } from "react-router-dom";

interface propsImf {
  item: detailsImf;
  type: Number;
}

function moviceItem(props: propsImf) {
  const navigate = useNavigate();
  let { item } = props;

  function onNavigateTo(filemId: number) {
    navigate(`/films/${filemId}`);
  }

  function onBuyTickets(props: propsImf) {
    navigate(`/films/cinemas/${item.filmId}`);
  }

  return (
    <div className="movice-item">
      <div className="movice-poster" onClick={() => onNavigateTo(item.filmId)}>
        <img src={item.poster} alt="" />
      </div>
      <div className="movice-content">
        <div className="movice-name">
          <div className="text-ellipsis">{item.name} </div>{" "}
          <span>{item.filmType.name}</span>
        </div>
        {item.grade ? (
          <div className="movice-grade">
            观众评分 <span>{item.grade}</span>{" "}
          </div>
        ) : undefined}
        <div className="movice-anctor text-ellipsis">
          {item.actors &&
            item.actors.map((anctor, index) => {
              return <span key={index}>{anctor.name} </span>;
            })}
        </div>
        <div className="movice-tips">
          <span>{item.nation}</span>
          <span>|</span>
          <span>{item.runtime} 分钟</span>
        </div>
      </div>
      <div>
        {props.type === 1 ? (
          <span onClick={() => onBuyTickets(props)}>购票</span>
        ) : item.isPresale ? (
          <span>预购</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default memo(moviceItem);
