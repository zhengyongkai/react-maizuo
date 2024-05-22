import { messageInf, selectedInf } from "@/types/chat";
import Styles from "./css/chatItem.module.scss";

function commonChat(props: { data: messageInf }) {
  let {
    data: { title, date, fromId, from, data },
  } = props;
  return (
    <div className={Styles["common-item-wrapper"]}>
      <div className={Styles["common-item-title"]}>{title}</div>
    </div>
  );
}

export default commonChat;
