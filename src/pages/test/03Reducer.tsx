import { createContext, useReducer } from "react";
import Children from "./components/children";
import Children1 from "./components/children1";

interface contextInf {
  globalData: number;
  setGlobalData: (val: number) => void;
}

export const context = createContext<contextInf>({
  globalData: 0,
  setGlobalData: (val) => {},
});

const initializer = {
  globalData: 0,
};
function reducer(res = initializer, action: { type: string; value: number }) {
  let obj = { ...res };
  switch (action.type) {
    case "add":
      obj.globalData += action.value;
      return obj;
    default:
      return obj;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initializer);

  return (
    <context.Provider
      value={{
        globalData: state.globalData,
        setGlobalData: function (val: number) {
          dispatch({
            type: "add",
            value: val,
          });
        },
      }}
    >
      <Children></Children>
      <Children1></Children1>
    </context.Provider>
  );
}
