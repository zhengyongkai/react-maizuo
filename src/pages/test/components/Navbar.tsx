import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Style from "../css/navbar.module.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const selector = useSelector((state) => {
    return state.user.user.username;
  });
  return (
    <>
      <div className={Style.navbar}>
        <div
          onClick={() => {
            navigate("/location");
          }}
        >
          北京
        </div>
        <div>电影</div>
      </div>
    </>
  );
}
