import Login from '@/page/login/login';
import type { userState } from '@/types/user';
import React from 'react';
import { useSelector } from 'react-redux';

interface propsInf {
  children: React.ReactElement;
}

/**
 * @description: 如果鉴权成功直接显示，不成则显示登录页
 * @param {propsInf} props
 * @return {*}
 */
export default function WithAuth(props: propsInf): React.ReactElement {
  const user = useSelector<userState, string>((state) => state.user.token);

  if (user) {
    return props.children;
  } else {
    return <Login exact></Login>;
  }
}
