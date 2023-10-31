import { Component, ReactNode } from "react";

interface childrenProps {
  data: string;
}

interface childrenState {
  text: string;
}

interface cycleState {
  data: string;
}

class Children extends Component<childrenProps, childrenState> {
  constructor(props: childrenProps) {
    console.log("constructor");
    super(props);
    this.state = {
      text: "",
    };
  }

  // 在渲染 DOM 元素之前会调用，并且在初始挂载及后续更新时都会被调用
  // 在状态改变之前 通过 props 可以改变 state
  // 在 render 之前在 constructor 之后
  static getDerivedStateFromProps(
    newProps: childrenProps,
    preState: childrenState
  ) {
    console.log("getDerivedStateFromProps", preState);
    let data = newProps.data.toLocaleUpperCase();

    return {
      text: data,
    };
  }

  componentDidMount(): void {
    console.log("componentDidMount");
  }

  componentDidUpdate(
    prevProps: Readonly<childrenProps>,
    prevState: Readonly<childrenState>,
    snapshot?: any
  ): void {
    console.log("componentDidUpdate");
  }

  render(): ReactNode {
    console.log("render");
    return (
      <>
        <div>props: {this.props.data}</div>
        <div>text:{this.state.text}</div>
      </>
    );
  }
}

export default class LifeCycle extends Component<any, cycleState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "woshizhengyongkai",
    };
  }

  render(): ReactNode {
    return (
      <>
        <button
          onClick={() =>
            this.setState({
              data: "woshicaizimin",
            })
          }
        >
          更改名字
        </button>
        <Children data={this.state.data}></Children>
      </>
    );
  }
}
