import {
  Outlet,
  Route,
  Routes,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";

import RouterPage2 from "./routerPage2";
import Tabbar from "./tabbar";
import Navbar from "./Navbar";
import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import "@/pages/css/home.scss";

export default function routerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const [type, setType] = useState(id);
  const [visable, setVisable] = useState(false);
  const preScrollLocation = useRef(0);

  function useScroll() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTop > 210) {
      setVisable(true);
    } else {
      setVisable(false);
    }
    // console.log('dd');
  }

  const scrollCallback = useScroll;

  useEffect(() => {
    setType(id);
  }, [id]);

  useEffect(() => {
    window.addEventListener("scroll", scrollCallback);

    return () => {
      window.removeEventListener("scroll", scrollCallback);
    };
  }, []);
  return (
    <>
      <div style={{ position: "relative", top: visable ? 48 : 0 }}>
        <div className={visable ? "tabbar-scroll" : "tabbar"}>
          {visable ? <Navbar></Navbar> : ""}
          <div className="tabbar">
            <div
              className={type === "1" ? "active" : ""}
              onClick={() => {
                navigate("/name/home/1");
              }}
            >
              正在上映
            </div>
            <div
              className={type === "2" ? "active" : ""}
              onClick={() => {
                navigate("/name/home/2");
              }}
            >
              即将上映
            </div>
          </div>
        </div>
        <div
          className="main"
          style={{
            position: "relative",
          }}
        >
          <Outlet></Outlet>
        </div>
      </div>
      <Tabbar></Tabbar>
    </>
  );
}
