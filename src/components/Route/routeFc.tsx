import { cityStateImf, locationResultImf } from "@/types/location";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

interface propsImf {
  children: React.ReactElement;
}

export default function RouterLocation(props: propsImf): any {
  let { children } = props;

  // console.log(children);
  const cityId = useSelector<cityStateImf, number>(
    (locale) => locale.location.locale.cityId
  );

  const [city, setCity] = useState(cityId);

  useEffect(() => {
    setCity(cityId);
  }, [cityId]);

  if (!city) {
    return <Navigate to="/location"></Navigate>;
  } else {
    return children;
  }
}
