import BackImg from "@/assets/img/back.png";
import "@/pages/css/navTitle.scss";
import { useNavigate } from "react-router-dom";

interface props {
  back?: boolean;
  title?: string;
  children?: React.ReactNode;
}

export default function navTitle(props: props) {
  let { back, title, children } = props;

  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <div className="navBack">
          {back ? (
            <img src={BackImg} alt="" onClick={() => navigate(-1)} />
          ) : undefined}
        </div>
        <div className="navTitle text-ellipsis">{title}</div>

        <div className="navSlots">{children ? children : <></>}</div>
      </div>
    </>
  );
}
