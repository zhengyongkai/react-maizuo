import redux from "@/store/store";
import { Loading } from "antd-mobile";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import ReduxChild from "./components/redux";

const ReduxComponents = (props) => {
  const [num, setNum] = useState(redux.getState().num);
  const name = useSelector((state) => state.user.name);
  const list = useSelector((state) => state.user.list);
  const loading = useSelector((state) => state.user.loading);

  console.log(list);
  useEffect(() => {
    // react-redux 简化了 subscribe 的动作
    // redux.subscribe(() => {
    //   //   console.log("123", redux.getState().num);
    //   setNum(redux.getState().num);
    // });
  }, []);
  return (
    <>
      Parent{props.num} {name}
      <ReduxChild></ReduxChild>
      {loading ? (
        <Loading></Loading>
      ) : (
        list.map((res, index: number) => {
          return <li key={index}>{res}</li>;
        })
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    num: state.num,
  };
};

export default connect(mapStateToProps)(ReduxComponents);
