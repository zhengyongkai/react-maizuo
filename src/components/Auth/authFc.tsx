import Login from "@/pages/test/components/login";
import { userState } from "@/pages/types/user";
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
    return <Login></Login>;
  }
}
