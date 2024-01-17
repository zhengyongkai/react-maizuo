import { memo } from "react";

import Styles from "@/assets/css/cityItem.module.scss";
import { combineCss } from "@/utils/css";

interface cityItemInf {
  activeName: string;
  title: string;
  onClick: (title: string) => void;
}

function cityItem(props: cityItemInf) {
  const { activeName, title, onClick } = props;
  return (
    <div
      className={combineCss([
        Styles["city-item"],
        activeName === title ? Styles["city-tabs-active"] : "",
      ])}
      onClick={() => onClick(title)}
    >
      {title}
    </div>
  );
}

export default memo(cityItem);
