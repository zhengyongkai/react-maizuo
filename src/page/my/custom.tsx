import NavTitle from "@/components/Common/navTitle";

import Styles from "@/assets/css/custom.module.scss";
import { useEffect } from "react";
import socketIo from "@/utils/socket";

function ChatTitle() {
  return <>机器人小智</>;
}

function customPage() {
  const socket = socketIo.getInstance();

  useEffect(() => {
    socket?.emit("join");
  }, []);

  function send() {
    socket?.emit("hello", "hhh");
  }
  return (
    <>
      <NavTitle title="在线客服" back></NavTitle>
      <div className={Styles["custom-body"]}>
        <ChatTitle></ChatTitle>
      </div>
      <div className={Styles["custom-tabbar"]}>
        <button onClick={send}>点击我发送消息</button>
      </div>
    </>
  );
}

export default customPage;
