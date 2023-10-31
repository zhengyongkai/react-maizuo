import React from "react";
import PropsType from "prop-types";

type StateType = {
  text: string;
};
type propType = {
  title: number;
};

export default class TClass extends React.Component<propType, StateType> {
  constructor(props: propType) {
    super(props);
    this.state = {
      text: "ss",
    };
  }

  render() {
    return (
      <>
        <div>
          {this.state.text} {this.props.title}
        </div>
      </>
    );
  }
}
