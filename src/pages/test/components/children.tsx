import React, { useContext } from "react";

interface childrenState {}
interface childrenProps {}
import { context } from "../03Reducer";

const children: React.FC<childrenProps> = (props) => {
  const data = useContext(context);
  return (
    <>
      <button onClick={() => data.setGlobalData(32)}>点击我</button>
      <div>{data.globalData}</div>
    </>
  );
};

export default children;
