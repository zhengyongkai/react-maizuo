import React, { Component, Context, PureComponent, ReactNode } from "react";

export default class Parent extends React.Component {
  state = {
    childName: "我是子组件的名字",
    parentIndex: 1,
  };

  componentWillMount() {
    console.log("dd");
  }

  render() {
    return (
      <>
        <button
          onClick={() =>
            this.setState({
              parentIndex: this.state.parentIndex + 1,
            })
          }
        >
          点击我改变数据
        </button>
        <button
          onClick={() =>
            this.setState({
              childName: "我把名字改了",
            })
          }
        >
          点击我改变子组件名字
        </button>
        <Children childName={this.state.childName}></Children>
      </>
    );
  }
}

class Children extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.childName !== this.props.childName;
  }
  render() {
    console.log("render");
    return <>{this.props.childName}</>;
  }
}
