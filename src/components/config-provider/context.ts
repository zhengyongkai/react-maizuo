import { createContext } from "react";

export interface ConfigProviderProps {
  children: any;
}

export interface configProps {
  theme: "Light" | "dark";
}

export const getDefaultPrefix = (suffixCls: string) => {
  return suffixCls ? `k-${suffixCls}` : "k";
};

export interface ConfigContextProps {
  children: React.ReactNode[];
}

export const ConfigContext = createContext<ConfigContextProps & configProps>({
  children: [],
  theme: "dark",
});
