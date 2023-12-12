/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { cityStateImf, locationResultImf } from "@/types/location";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface propsImf {
  children: React.ReactElement;
}

export default function RouterLocation(props: propsImf): any {
  let { children } = props;

  let pathname = useLocation();
  // console.log(pathname);
  const cityId = useSelector<cityStateImf, number>(
    (locale) => locale.location.locale.cityId
  );

  const [city, setCity] = useState(cityId);

  useEffect(() => {
    // console.log(city);
    setCity(cityId);
  }, [cityId]);

  if (!city) {
    return <Navigate to="/location"></Navigate>;
  } else {
    return children;
  }
}
