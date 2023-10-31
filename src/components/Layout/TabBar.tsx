import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, TabBar } from "antd-mobile";

import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";

export default () => {
  const navbarRouterList = ["/home"];

  const location = useLocation();
  const navigate = useNavigate();
  const [isNavbar, setNavbar] = useState(false);

  const onNavigateTo = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    if (navbarRouterList.includes(location.pathname)) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }, [location]);
  const tabs = [
    {
      key: "/home",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: "/todo",
      title: "待办",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "/message",
      title: "消息",
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: "99+",
    },
    {
      key: "/personalCenter",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  return (
    <>
      {isNavbar ? (
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <TabBar safeArea={true} onChange={(value) => onNavigateTo(value)}>
            {tabs.map((item) => (
              <TabBar.Item
                key={item.key}
                badge={item.badge}
                icon={item.icon}
                title={item.title}
              />
            ))}
          </TabBar>
        </div>
      ) : undefined}
    </>
  );
};
