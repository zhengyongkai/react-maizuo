import Styles from "@/assets/css/movice.module.scss";
import { memo } from "react";

import type { detailsInf } from "@/types/movice";
import { useNavigate } from "react-router-dom";
import { cssCb } from "@/utils/css";

interface propsInf {
  item: detailsInf;
  type: Number;
}

function MoviceItem(props: propsInf) {
  const navigate = useNavigate();
  let { item } = props;

  function onNavigateTo(filemId: number) {
    navigate(`/films/${filemId}`);
  }

  function onBuyTickets() {
    navigate(`/films/cinemas/${item.filmId}`);
  }

  return (
    <div className={Styles["movice-item"]}>
      <div
        className={Styles["movice-poster"]}
        onClick={() => onNavigateTo(item.filmId)}
      >
        <img src={item.poster} alt="" />
      </div>
      <div className={Styles["movice-content"]}>
        <div className={cssCb([Styles["movice-name"], "flex", "items-center"])}>
          <div className="truncate">{item.name} </div>{" "}
          <span>{item.filmType.name}</span>
        </div>
        {item.grade ? (
          <div className={Styles["movice-grade"]}>
            观众评分 <span>{item.grade}</span>{" "}
          </div>
        ) : undefined}
        <div className={cssCb([Styles["movice-anctor"], "truncate"])}>
          {item.actors &&
            item.actors.map((anctor, index) => {
              return <span key={index}>{anctor.name} </span>;
            })}
        </div>
        <div className={Styles["movice-tips"]}>
          <span>{item.nation}</span>
          <span>|</span>
          <span>{item.runtime} 分钟</span>
        </div>
      </div>
      <div>
        {props.type === 1 ? (
          <span onClick={onBuyTickets}>购票</span>
        ) : item.isPresale ? (
          <span onClick={onBuyTickets}>预购</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default memo(MoviceItem);
