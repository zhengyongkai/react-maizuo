import React from "react";

export default class lifecycle extends React.Component {
  UNSAFE_componentWillMount(): void {
    console.log("正在挂载中");
  }
  componentDidMount(): void {
    console.log("挂载完成，可以调用Dom节点");
  }
  render(): React.ReactNode {
    console.log("我是render生命周期");
    return (
      <>
        <div>我是React生命周期</div>
      </>
    );
  }
  UNSAFE_componentWillReceiveProps(
    nextProps: Readonly<{}>,
    nextContext: any
  ): void {}
  UNSAFE_componentWillUpdate(
    nextProps: Readonly<{}>,
    nextState: Readonly<{}>,
    nextContext: any
  ): void {
    console.log("更新前，不能调用Dom");
  }
  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log("更新后，可以拿到新的Dom");
  }
  componentWillUnmount(): void {
    console.log("组件已经卸载");
  }
}
