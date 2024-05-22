import NavTitle from "@/components/Layout/NavTitle";
import { Avatar, ImageUploader, List, Toast } from "antd-mobile";

import Styles from "@/assets/css/setting.module.scss";
import { useDispatch, useSelector } from "react-redux";
import type { user, userState } from "@/types/user";
import { useNavigate } from "react-router-dom";

import { clearUserData, getUserDataThunk } from "@/store/common/user";
import { ChangeEvent, SyntheticEvent, useRef } from "react";
import { uploadUserHeadIcon } from "@/api/user";
import { acceptFile } from "@/utils/file";

export default function SettingPage() {
  const version = import.meta.env.VITE_BASE_VERSION;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const FileRef = useRef<HTMLInputElement | null>(null);

  const userState = useSelector<userState, user>(
    (state) => state.user.userData,
  );

  /**
   * @description: 登出并且清除数据，并且返回到首页
   * @return {*}
   */
  function logout() {
    dispatch(clearUserData());
    navigate("/");
  }

  /**
   * @description: 选择图片
   * @return {*}
   */
  function chooseImg() {
    FileRef.current!.click();
  }

  /**
   * @description:选择图片回调
   * @return {*}
   */
  async function fileChange(e: ChangeEvent) {
    const file = (e.target as HTMLInputElement).files![0];
    if (!acceptFile(file, [".png", ".jpeg"])) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    let { data } = await uploadUserHeadIcon(formData);
    if (data === 1) {
      Toast.show("上传图片成功");
      dispatch(getUserDataThunk());
    }
  }

  return (
    <>
      <NavTitle title="设置" back></NavTitle>
      <div className={Styles["setting-wrapper"]}>
        <List>
          <List.Item
            extra={<Avatar src={userState.headIcon} />}
            onClick={chooseImg}
          >
            头像
          </List.Item>
        </List>
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
      <input
        className="hidden"
        type="file"
        ref={FileRef}
        accept="image/gif,image/jpeg,image/jpg,image/png"
        onChange={fileChange}
      ></input>
    </>
  );
}
