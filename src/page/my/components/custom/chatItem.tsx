import { selectedInf } from "@/types/chat";
import { memo, useMemo } from "react";
import SelectedChat from "./selected";
import CommonChat from "./common";

import Styles from "./css/chatItems.module.scss";
import { combineCss } from "@/utils/css";
import socketIo from "@/utils/socket";

function chatItem(props: { data: selectedInf; onChange: (e: string) => void }) {
  let {
    data: { title, date, fromId, from, data, type, fromMy },
    onChange,
  } = props;
  const components = useMemo(() => {
    if (type === "selected") {
      return (
        <SelectedChat
          data={props.data}
          onChange={(e) => onChange(e)}
        ></SelectedChat>
      );
    } else if (type === "text") {
      return <CommonChat data={props.data}></CommonChat>;
    }
  }, [props]);

  return (
    <>
      <div
        className={combineCss([
          fromMy ? Styles["chat-item-right"] : Styles["chat-item-left"],
          Styles["chat-item"],
        ])}
      >
        <div>{from}</div>
        <div>{components}</div>
      </div>
    </>
  );
}

export default memo(chatItem);
