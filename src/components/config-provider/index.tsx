import React from "react";
import { ConfigContext } from "./context";
import type { ConfigProviderProps, configProps } from "./context";

const ConfigProvider: React.FC<ConfigProviderProps & configProps> = (props) => {
  // const themeContext =

  return (
    <ConfigContext.Provider value={props}>
      {props.children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
