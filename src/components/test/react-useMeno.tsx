import { useEffect, useMemo, useState, memo, useCallback } from "react";

interface childrenProps {
  childrenName: string;
  func: (val: string) => void;
}

const Children = memo((props: childrenProps) => {
  useEffect(() => {
    console.log("修改了");
  });
  return (
    <>
      <div onClick={() => props.func("ddd")}>{props.childrenName}</div>
    </>
  );
});

export default function parent() {
  const [childrenName, setChildrenName] = useState("郑永楷");
  const [sex, setSex] = useState("男");
  const func = (val: string) => {
    console.log("3123123", val);
  };
  // const menoFunc = useMemo(() => () => func, []);
  const callbackFunc = useCallback(() => func, []);

  return (
    <>
      <div>
        <button onClick={() => setSex(sex === "男" ? "女" : "男")}>
          点击我更改性别
        </button>
        <button
          onClick={() =>
            setChildrenName(
              childrenName === "郑永楷" ? "改了名字的郑永楷" : "郑永楷"
            )
          }
        >
          点击我修改名字
        </button>
        {sex}
        <Children childrenName={childrenName} func={callbackFunc()}></Children>
      </div>
    </>
  );
}

// memo 只能针对于 props 不是方法
// 当 props 为 function 的时候  memo 失效
// 需要 useMemo 的使用来限制 children 的刷新
