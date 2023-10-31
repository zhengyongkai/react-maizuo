import { Component, ReactNode } from "react";

interface childrenProps {
  parentText: string;
}

interface childrenState {
  childrenText: string;
}

interface parentState {
  parentText: string;
}

class Children extends Component<childrenProps, childrenState> {
  constructor(props: childrenProps) {
    super(props);
    this.state = {
      childrenText: "childrenText",
    };
  }
  // 這個函數會把返回值傳給 componentDidUpdate , 可以用來控制dom的更新
  getSnapshotBeforeUpdate(
    prevProps: Readonly<childrenProps>,
    prevState: Readonly<childrenState>
  ) {
    console.log(this.props.parentText);
    return null;
  }
  componentDidUpdate(
    prevProps: Readonly<childrenProps>,
    prevState: Readonly<childrenState>,
    snapshot?: any
  ): void {}
  render(): ReactNode {
    return (
      <>
        <div>child:{this.state.childrenText}</div>
        <div>parent :{this.props.parentText}</div>
      </>
    );
  }
}

export default class Parent extends Component<any, parentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      parentText: "來來來",
    };
  }
  render(): ReactNode {
    return (
      <>
        <button onClick={() => this.setState({ parentText: "3123" })}>
          改變值
        </button>
        <Children parentText={this.state.parentText}></Children>
      </>
    );
  }
}
