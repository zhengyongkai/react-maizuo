import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Style from "@/assets/css/navbar.module.scss";

import type { cityStateImf } from "@/types/location";
import { DownOutline } from "antd-mobile-icons";

export default function Navbar() {
  const navigate = useNavigate();
  const citySelector = useSelector((state: cityStateImf) => {
    return state.location.locale.name;
  });
  const [city, setCity] = useState(citySelector);

  useEffect(() => {
    setCity(citySelector);
  }, [citySelector]);
  return (
    <>
      <div className={Style.navbar}>
        <div
          onClick={() => {
            navigate("/location");
          }}
        >
          {city} <DownOutline></DownOutline>
        </div>
        <div>电影</div>
      </div>
    </>
  );
}
