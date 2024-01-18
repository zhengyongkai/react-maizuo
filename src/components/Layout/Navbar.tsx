import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Styles from "@/assets/css/navbar.module.scss";

import type { cityStateInf } from "@/types/location";
import { DownOutline } from "antd-mobile-icons";

interface navbarInf {
  title?: string;
  children?: React.ReactNode;
}

export default function Navbar(props: navbarInf) {
  const { title = "电影", children } = props;

  const navigate = useNavigate();
  const citySelector = useSelector((state: cityStateInf) => {
    return state.location.locale.name;
  });
  const [city, setCity] = useState(citySelector);

  useEffect(() => {
    setCity(citySelector);
  }, [citySelector]);
  return (
    <>
      <div className={Styles.navbar}>
        <div
          onClick={() => {
            navigate("/location");
          }}
        >
          {city} <DownOutline></DownOutline>
        </div>
        <div>{title}</div>
        <div className={Styles["navSlots"]}>{children ? children : <></>}</div>
      </div>
    </>
  );
}
