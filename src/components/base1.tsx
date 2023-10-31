import { Component } from "react";

type Props = {
  title: string;
};

type childrenProps = {
  childName: string;
  change: (val: string) => void;
};

class Children extends Component<childrenProps> {
  render() {
    return (
      <div
        onClick={() => {
          this.props.change("我是改了名的儿子");
        }}
      >
        {this.props.childName}
      </div>
    );
  }
}

class Base1 extends Component<Props> {
  state = {
    childrenName: "我是儿子",
  };
  changeName(val: string) {
    this.setState({
      childrenName: val,
    });
  }
  render() {
    return (
      <Children
        childName={this.state.childrenName}
        change={this.changeName.bind(this)}
      ></Children>
    );
  }
}

export default Base1;
