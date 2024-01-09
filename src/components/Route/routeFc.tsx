/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import type { cityStateImf } from "@/types/location";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LocationPage from "@/page/location/location";

interface propsImf {
  children: React.ReactElement;
}

export default function RouterLocation(props: propsImf): any {
  let { children } = props;

  // console.log(pathname);
  const cityId = useSelector<cityStateImf, number>(
    (locale) => locale.location.locale.cityId
  );

  const [city, setCity] = useState(cityId);

  useEffect(() => {
    setCity(cityId);
  }, [cityId]);

  if (!city) {
    return <LocationPage></LocationPage>;
  } else {
    return children;
  }
}
