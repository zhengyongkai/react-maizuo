import Login from "@/page/login/login";
import type { userState } from "@/types/user";
import React from "react";
import { useSelector } from "react-redux";

interface propsInf {
  children: React.ReactElement;
}

export default function AuthHoc(props: propsInf): React.ReactElement {
  const user = useSelector<userState>((state) => state.user.token);

  if (user) {
    return props.children;
  } else {
    return <Login exact></Login>;
  }
}
