import {
  Context,
  useContext,
  memo,
  Reducer,
  createContext,
  useReducer,
  Component,
  ReactNode,
} from "react";

interface actionImf {
  type: string;
}

const context = createContext({});

const states = {
  num: 0,
};

const countReducer = function (prevState = states, actions: actionImf) {
  let newState = { ...prevState };
  if (actions.type) {
    newState.num += 1;
    return newState;
  }
  return prevState;
};

export default function Parent() {
  const [nums, dispatch] = useReducer(countReducer, states);
  return (
    <>
      <context.Provider
        value={{
          dispatch: dispatch,
          nums,
        }}
      >
        <div>这是父页面</div>
        <Children></Children>
      </context.Provider>
    </>
  );
}

class Children extends Component {
  render(): ReactNode {
    const data = useContext(context);
    console.log(data);
    return (
      <>
        <div>这是子页面</div>
      </>
    );
  }
}
