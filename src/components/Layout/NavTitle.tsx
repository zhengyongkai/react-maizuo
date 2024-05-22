import BackImg from "@/assets/img/back.png";
import Styles from "@/assets/css/navTitle.module.scss";
import { useNavigate } from "react-router-dom";
import { cssCb } from "@/utils/css";

interface props {
  back?: boolean;
  title?: string;
  children?: React.ReactNode;
  backFn?: () => unknown;
}

export default function NavTitle(props: props) {
  let { back, title, children, backFn } = props;

  const navigate = useNavigate();

  return (
    <>
      <div className={Styles["navbar"]}>
        <div className={Styles["navBack"]}>
          {back ? (
            <img
              src={BackImg}
              alt=""
              onClick={() => (backFn ? backFn() : navigate(-1))}
            />
          ) : undefined}
        </div>
        <div className={cssCb([Styles["navTitle"], "truncate"])}>{title}</div>

        <div className={Styles["navSlots"]}>{children ? children : <></>}</div>
      </div>
    </>
  );
}
