import NavTitle from "@/components/Layout/NavTitle";

import Styles from "@/assets/css/custom.module.scss";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import socketIo from "@/utils/socket";
import type { messageInf } from "@/types/chat";
import ChatItem from "./components/custom/ChatItem";
import { userSimpleInf, userState } from "@/types/user";
import { useSelector } from "react-redux";
import { getDateFormat } from "@/utils/day";
import { cssCb } from "@/utils/css";

export default function CustomPage() {
  const [messageList, setMessageList] = useState<messageInf[]>([]);
  const [value, setValue] = useState("");

  const user = useSelector<userState, userSimpleInf>(
    (state) => state.user.userData,
  );

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

  /**
   * @description: 滚动到顶部，当发送消息或者收到消息的时候自动滚动到底部
   * @param {*}
   * @return {*}
   */
  function scrollBottom() {
    setTimeout(() => {
      bodyRef.current?.scrollTo(0, bodyRef.current.offsetHeight + 72);
    }, 200);
  }

  /**
   * @description: 回车提交信息
   * @param {React} e
   * @return {*}
   */
  function onKeydown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.keyCode === 13) {
      e.preventDefault();
      send(null, e.currentTarget.value);
    }
  }

  /**
   * @description: 根据类别返回该类型的列表
   * @param {*}
   * @return {*} ChatItem[]
   */
  const message = useMemo(() => {
    return messageList.map((item, index) => {
      return (
        <ChatItem
          key={index}
          data={item}
          onChange={(id, e) => send(id, e)}
        ></ChatItem>
      );
    });
  }, [messageList]);

  /**
   * @description: 发送消息
   * @param {string} id
   * @param {string} message
   * @return {*}
   */
  function send(id: string | null, message: string) {
    if (message) {
      messageRef.current.push({
        type: "text",
        title: message,
        date: getDateFormat(new Date().toString()),
        from: user.nickName,
        fromId: user.userId,
        fromMy: true,
        id,
        data: [],
      });
      setMessageList([...messageRef.current]);
    }
    socketIo.emit("robot", id || message);
    scrollBottom();
  }

  return (
    <>
      <NavTitle title="在线客服" back></NavTitle>
      <div
        className={cssCb(["inner-scroll", Styles["custom-body"]])}
        ref={bodyRef}
      >
        {message}
      </div>
      <div className={Styles["custom-tabbar"]}>
        <div>
          <textarea
            placeholder="很高兴为你服务，请输入你想查询的内容"
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            onKeyDown={(e) => onKeydown(e)}
          ></textarea>
        </div>
        <div>
          <div onClick={() => send(null, value)}>发送</div>
        </div>
      </div>
    </>
  );
}
