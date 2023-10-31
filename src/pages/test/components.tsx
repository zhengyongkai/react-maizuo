import { useEffect, useRef, useState, memo } from "react";
import PropTypes from "prop-types";

interface childrenProps {
  childrenName: string;
  sex: string;
}

function Children(props: childrenProps) {
  useEffect(() => {
    console.log("重新渲染了");
  });
  useEffect(() => {
    console.log("子组件加载");
  }, []);
  useEffect(() => {
    console.log("子组件传过来的props更改了");
  }, [props.childrenName]);
  return (
    <>
      <div>
        {props.childrenName}
        {props.sex}
      </div>
    </>
  );
}

function childrenPropsChange(
  prevProps: childrenProps,
  nextProps: childrenProps
) {
  if (prevProps.childrenName === nextProps.childrenName) {
    return true;
  }
  return false;
}

Children.PropTypes = {
  childrenName: PropTypes.string,
  sex: PropTypes.string,
};

const Meno = memo(Children, childrenPropsChange);

export default function Parent() {
  const [childrenName, setChildrenName] = useState("郑永楷");
  const [sex, setSex] = useState("男");
  const [useless, setUseLess] = useState("没用的数据");
  return (
    <>
      <div>
        <button onClick={() => setSex(sex === "男" ? "女" : "男")}>
          修改性别
        </button>
        <button
          onClick={() => {
            setUseLess(
              useless === "修改没用的数据" ? "没用的数据" : "修改没用的数据"
            );
          }}
        >
          修改没用的数据
        </button>
        <button onClick={() => setChildrenName("改了")}>点击我改变名字</button>
        <Meno childrenName={childrenName} sex={sex}></Meno>
        {useless}
      </div>
    </>
  );
}

/*

没有 React.meno , 父组件每一次修改数据，子组件都会重新render

有了 React.meno ,  子组件可以自定义props的渲染系统 

*/
