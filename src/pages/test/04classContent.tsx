import { Component, createContext, ReactNode } from "react";

interface contextProps {
  value: number;
  setValue: Function;
}

const context = createContext({} as contextProps);

class Children extends Component {
  render(): ReactNode {
    return (
      <>
        <context.Consumer>
          {(data: contextProps) => {
            return (
              <>
                <button onClick={() => data.setValue(data.value + 1)}>
                  {data.value}
                </button>
              </>
            );
          }}
        </context.Consumer>
      </>
    );
  }
}

export default class Parent extends Component {
  state: Readonly<{
    value: number;
  }> = {
    value: 0,
  };
  render(): ReactNode {
    return (
      <>
        <context.Provider
          value={
            {
              value: this.state.value,
              setValue: (e: number) => this.setState({ value: e }),
            } as contextProps
          }
        >
          <div>
            <Children></Children>
          </div>
        </context.Provider>
      </>
    );
  }
}
