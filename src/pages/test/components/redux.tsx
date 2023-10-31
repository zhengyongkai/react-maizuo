import redux from "@/store/store";
import { Button } from "antd-mobile";
import { useEffect, useState } from "react";
import { NumAction, asyncAction } from "@/store/actions/action";
import { setName, asyncActionRequest } from "@/store/toolkit";
import { connect, useDispatch } from "react-redux";

import style from "@/pages/css/text.module.scss";

const ReduxChild = (props) => {
  const [name, setNames] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  // console.log(Text);
  return (
    <>
      <input value={name} onChange={(e) => setNames(e.currentTarget.value)} />
      <Button
        onClick={() => {
          dispatch(setName({ value: name }));
        }}
      >
        提交
      </Button>
      <Button
        onClick={() => {
          dispatch(asyncActionRequest());
        }}
      >
        获取数据
      </Button>
      <div className={style.text}>css module 模块化</div>
      <div className="text">css module global</div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  // addNum: () => NumAction(),

  return {
    // addNum: () => {
    //   setTimeout(() => {
    //     dispatch(NumAction());
    //   }, 10);
    // },
    addNum: () => dispatch(asyncAction()),
  };
};
export default connect(null, mapDispatchToProps)(ReduxChild);
