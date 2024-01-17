import { messageInf, orderInf, selectedInf, textInf } from "@/types/chat";
import { memo, useMemo } from "react";
import SelectedChat from "./selected";
import CommonChat from "./common";
import OrderChat from "./order";

import Styles from "./css/chatItems.module.scss";
import { combineCss } from "@/utils/css";
import socketIo from "@/utils/socket";
import { getDateFormat } from "@/utils/day";

function chatItem(props: {
  data: messageInf;
  onChange: (id: string, e: string) => void;
}) {
  let {
    data: { from, type, fromMy, date },
    onChange,
  } = props;
  const components = useMemo(() => {
    if (type === "selected") {
      return (
        <SelectedChat
          data={props.data as selectedInf}
          onChange={(id, e) => onChange(id, e)}
        ></SelectedChat>
      );
    } else if (type === "text") {
      return <CommonChat data={props.data as textInf}></CommonChat>;
    } else if (type === "order") {
      return <OrderChat data={props.data as orderInf}></OrderChat>;
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
        <div>
          {from} {getDateFormat(date)}
        </div>
        <div>{components}</div>
      </div>
    </>
  );
}

export default memo(chatItem);
