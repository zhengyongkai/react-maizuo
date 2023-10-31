import React from "react";

// 通过消息订阅实现通信
const Bus = {
  list: new Map(),
  on: function (val: string, fun: (val: string) => void) {
    this.list.set(val, [...(this.list.get(val) || []), fun]);
    console.log(this.list);
  },
  // 只能调用个一次
  once: function (val: string, fun: (val: string) => void) {
    this.list.set(val, [
      ...(this.list.get(val) || []),
      (res: string) => {
        fun(res);
        this.list.delete(val);
      },
    ]);
  },
  emit: function (val: string, string: string) {
    console.log(val, this.list.get(val));
    if (this.list.get(val)) {
      [...this.list.get(val)].forEach((res) => {
        console.log(res);
        res && res(string);
      });
    }
  },
};

export default class Component extends React.Component {
  componentDidMount(): void {
    Bus.once("getMessage", (val: string) => {
      console.log("getMessage", val);
    });
  }
  render(): React.ReactNode {
    return (
      <>
        <div>
          <button
            onClick={() => {
              Bus.emit("changeData", "把名字改成我要的");
            }}
          >
            改名按钮
          </button>
          我是父组件
          <Children></Children>
        </div>
      </>
    );
  }
}

class Children extends React.Component {
  state = {
    childName: "我是儿子的名字",
  };
  componentDidMount(): void {
    Bus.on("changeData", (val: string) => {
      console.log(val);
      this.setState({
        childName: val,
      });
    });
  }
  render(): React.ReactNode {
    return (
      <>
        <div
          onClick={() => {
            Bus.emit("getMessage", "data");
          }}
        >
          {this.state.childName}
        </div>
      </>
    );
  }
}
