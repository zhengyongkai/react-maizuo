import {
  Outlet,
  Route,
  Routes,
  useSearchParams,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Tabbar from "@/components/Common/tabbar";

import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import "@/assets/css/home.scss";

export default function routerPage() {
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

  const scrollCallback = useScroll;

  useEffect(() => {
    window.addEventListener("scroll", scrollCallback);

    return () => {
      window.removeEventListener("scroll", scrollCallback);
    };
  }, []);
  return (
    <>
      <Outlet></Outlet>
      <Tabbar></Tabbar>
    </>
  );
}
