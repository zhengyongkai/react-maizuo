import CheckPng from "@/assets/img/check.png";
import Styles from "@/assets/css/checkCell.module.scss";
import { combineCss } from "@/utils/css";

interface checkCellInf {
  active?: boolean;
  title: string;
  value: number;
  onClick: (value: number) => void;
}

function CheckCell(props: checkCellInf) {
  let { active, title, value, onClick } = props;

  function renderItem() {
    return (
      <div
        onClick={() => onClick(value)}
        className={combineCss([
          Styles["check-cell-item"],
          active ? Styles["check-cell-isCheck"] : "",
        ])}
      >
        {active ? <img src={CheckPng} /> : <div></div>}
        <span>{title}</span>
      </div>
    );
  }

  return renderItem();
}

export default CheckCell;
