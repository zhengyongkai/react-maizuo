import React, { useCallback, useMemo, useState } from "react";

interface childrenProps {
  changeData: (e: any) => void;
  data: string;
}

function Children(props: childrenProps) {
  console.log("渲染开始");
  return (
    <>
      <div>{props.data}</div>
      <input
        onChange={(ext) => props.changeData(ext.target.value)}
        defaultValue={props.data}
      />
    </>
  );
}

const ChildrenMeno = React.memo(Children);

export default function useCallbackPage() {
  const [data, setData] = useState("zheng");
  const [list, setList] = useState<Array<string>>([]);

  // 缓存这个函数 防止父组件修改相关值得时候子组件更新 meno 只能作用在 state ,useCallback 可以坐拥在方法
  const changeData = useCallback((e: string) => {
    setData(e);
  }, []);

  // useMeno 相当于缓存属性，相当于 vue 的计算属性
  const filterKeyword = useMemo(
    () =>
      list.map(
        (value: string) =>
          value.substring(0, 1).toLocaleUpperCase() + value.substring(1)
      ),
    [list]
  );

  return (
    <div>
      {filterKeyword.map((value, index) => {
        return <div key={index}>{value + ""}</div>;
      })}
      <button onClick={() => setList([...list, "Zheng" + Math.random()])}>
        点击我更改父组件的list
      </button>
      <ChildrenMeno data={data} changeData={changeData} />
    </div>
  );
}
