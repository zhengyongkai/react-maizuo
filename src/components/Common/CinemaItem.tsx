import Styles from "@/assets/css/cinemaItem.module.scss";
import type { tudeStateInf } from "@/types/location";
import type { cinemasInfoInf } from "@/types/cinema";
import { getBetweenDistance } from "@/utils/location";
import { formatPrice } from "@/utils/price";
import { memo } from "react";
import { useSelector } from "react-redux";
import { cssCb } from "@/utils/css";

interface cinemaItemProps {
  item: cinemasInfoInf;
  onClick: () => void;
}

function CinemaItem(props: cinemaItemProps) {
  const { item, onClick } = props;

  const locationAttr = useSelector(
    (state: tudeStateInf) => state.location.tude
  );

  function getDistance(longitude: number, latitude: number) {
    return (
      getBetweenDistance(
        locationAttr.longitude,
        locationAttr.latitude,
        longitude,
        latitude
      ).toFixed(1) + "km"
    );
  }

  return (
    <div className={cssCb([Styles["cinemas-item"]])} onClick={onClick}>
      <div className={Styles["cinemas-top"]}>
        <div>{item.name}</div>
        {item.lowPrice ? (
          <div>
            <span>{formatPrice(item.lowPrice)}</span> <span>起</span>{" "}
          </div>
        ) : (
          <div>价格未知</div>
        )}
      </div>
      <div className={Styles["cinemas-bottom"]}>
        <div className="truncate">{item.address}</div>
        <div>{getDistance(item.longitude, item.latitude)}</div>
      </div>
    </div>
  );
}

export default memo(CinemaItem);
