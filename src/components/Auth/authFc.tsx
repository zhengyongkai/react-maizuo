import { userState } from "@/pages/types/user";
import cookie from "@/pages/utils/cookie";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface propsInf {
  children: React.ReactElement;
}

export default function AuthHoc(props: propsInf): any {
  // const navigator = useNavigate();
  const location = useLocation();

  const rediectUrl = location.pathname;

  cookie.setCookie("redirectURL", rediectUrl);

  const user = useSelector<userState>((state) => state.user.token);
  console.log(user);
  if (user) {
    return props.children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
