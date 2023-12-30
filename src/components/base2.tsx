import React, { createRef } from 'react';

class Children extends React.Component {
  state = {
    data: '我是儿子的名字',
  };
  changeData() {
    this.setState({
      data: '我是改了名的儿子',
    });
  }
  render() {
    return <>{this.state.data}</>;
  }
}

export default class Parent extends React.Component {
  ref = createRef<HTMLDivElement | null>(null);
  render() {
    return (
      <>
        <button
          onClick={() => {
            console.log(this.ref.current.changeData());
          }}
        >
          点击修改子组件的值
        </button>
        <Children ref={this.ref}></Children>
      </>
    );
  }
}
