import NavTitle from "@/components/Common/navTitle";

import Styles from "@/assets/css/custom.module.scss";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import socketIo from "@/utils/socket";
import type { messageInf } from "@/types/chat";
import ChatItem from "./components/custom/chatItem";

function customPage() {
  const [messageList, setMessageList] = useState<messageInf[]>([]);
  const [value, setValue] = useState("");

  const messageRef = useRef<messageInf[]>([]);

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketIo.emit("robot", null);

    socketIo.getInstance()?.on("message", (data: messageInf) => {
      messageRef.current.push(data);
      setMessageList([...messageRef.current]);
      scrollBottom();
    });
  }, []);

  function scrollBottom() {
    setTimeout(() => {
      bodyRef.current?.scrollTo(0, bodyRef.current.offsetHeight + 48);
    }, 0);
  }

  const message = useMemo(() => {
    return messageList.map((item, index) => {
      return <ChatItem data={item} onChange={(e) => send(e)}></ChatItem>;
    });
  }, [messageList]);

  function send(message: string) {
    if (message) {
      messageRef.current.push({
        type: "text",
        title: message,
        date: "",
        from: "机器人",
        fromId: -1,
        fromMy: true,
      });
      setMessageList([...messageRef.current]);
    }

    socketIo.emit("robot", message);

    scrollBottom();
  }
  return (
    <>
      <NavTitle title="在线客服" back></NavTitle>
      <div className={Styles["custom-body"]} ref={bodyRef}>
        {message}
      </div>
      <div className={Styles["custom-tabbar"]}>
        <input
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        ></input>
        <button onClick={(e) => send(value)}>发送</button>
      </div>
    </>
  );
}

export default customPage;
