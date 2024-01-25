import NavTitle from "@/components/Layout/NavTitle";
import { List } from "antd-mobile";

import Styles from "@/assets/css/setting.module.scss";
import { useDispatch, useSelector } from "react-redux";
import type { user, userState } from "@/types/user";
import { useNavigate } from "react-router-dom";

import { clearUserData } from "@/store/common/user";

export default function SettingPage() {
  const version = import.meta.env.VITE_BASE_VERSION;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector<userState, user>(
    (state) => state.user.userData
  );

  /**
   * @description: 登出并且清除数据，并且返回到首页
   * @return {*}
   */
  function logout() {
    dispatch(clearUserData());
    navigate("/");
  }

  return (
    <>
      <NavTitle title="设置" back></NavTitle>
      <div className={Styles["setting-wrapper"]}>
        <List>
          <List.Item extra={userState.userId}>账号</List.Item>
        </List>
        <List>
          <List.Item extra={version}>软件版本</List.Item>
        </List>
        <div className={Styles["setting-bottom"]} onClick={logout}>
          退出登录
        </div>
      </div>
    </>
  );
}
