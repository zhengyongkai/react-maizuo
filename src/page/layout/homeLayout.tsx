import {
  Outlet,
  Route,
  Routes,
  useSearchParams,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Navbar from "@/components/Common/Navbar";
import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  memo,
} from "react";
import "@/assets/css/home.scss";
import useSroll from "@/hook/scroll";

function HomePage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [visable, setVisable] = useState(false);
  const [path, setPath] = useState(pathname);

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

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  useSroll(useScroll);

  return (
    <>
      <div
        style={{
          position: "relative",
          top: visable ? 48 : 0,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div className={visable ? "tabbar-scroll" : "tabbar"}>
          {visable ? <Navbar></Navbar> : ""}
          <div className="tabbar">
            <div
              onClick={() => {
                navigate("/name/home/nowPlaying");
              }}
            >
              <span
                className={path === "/name/home/nowPlaying" ? "active" : ""}
              >
                正在上映
              </span>
            </div>
            <div
              onClick={() => {
                navigate("/name/home/comingSoon");
              }}
            >
              <span
                className={path === "/name/home/comingSoon" ? "active" : ""}
              >
                即将上映
              </span>
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
    </>
  );
}

export default memo(HomePage);
