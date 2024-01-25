import { memo } from "react";

import Styles from "@/assets/css/cityItem.module.scss";
import { cssCb } from "@/utils/css";

interface cityItemInf {
  activeName: string;
  title: string;
  onClick: (title: string) => void;
}

function CityItem(props: cityItemInf) {
  const { activeName, title, onClick } = props;
  return (
    <div
      className={cssCb([
        "truncate",
        Styles["city-item"],
        activeName === title ? Styles["city-tabs-active"] : "",
      ])}
      onClick={() => onClick(title)}
    >
      {title}
    </div>
  );
}

export default memo(CityItem);
