import { FC, useContext, useState, createContext } from "react";

const context = createContext<contextInterface>({
  num: 0,
  setNum: () => {},
});

interface childPorps {}

interface contextInterface {
  num: number;
  setNum: Function;
}

const Children: FC<childPorps> = () => {
  return (
    <>
      <context.Consumer>
        {(data: contextInterface) => {
          return (
            <>
              <button onClick={() => data.setNum(data.num + 1)}>
                {data.num}
              </button>
            </>
          );
        }}
      </context.Consumer>
    </>
  );
};

interface parentProps {}

const Parent: FC<parentProps> = () => {
  const [num, setNum] = useState(1);

  return (
    <>
      <context.Provider value={{ num, setNum } as contextInterface}>
        <Children></Children>
      </context.Provider>
    </>
  );
};

export default Parent;
