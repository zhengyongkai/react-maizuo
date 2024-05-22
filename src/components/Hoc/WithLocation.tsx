/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import type { cityStateInf } from '@/types/location';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LocationPage from '@/page/location/location';

interface propsInf {
  children: React.ReactElement;
}

/**
 * @description: 是否已经获取用户信息，如果未获取用户信息，显示获取用户信息页面
 * @param {propsInf} props
 * @return {*}
 */
export default function WithLocation(props: propsInf): any {
  let { children } = props;

  // console.log(pathname);
  const cityId = useSelector<cityStateInf, number>((locale) => locale.location.locale.cityId);

  const [city, setCity] = useState(cityId);

  useEffect(() => {
    setCity(cityId);
  }, [cityId]);

  if (!city) {
    return <LocationPage back={false}></LocationPage>;
  } else {
    return children;
  }
}
