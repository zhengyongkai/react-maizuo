/// <reference types="vite/client" />

import "react-bmapgl";

// 导入环境变量
interface ImportMetaEnv {
  readonly VITE_NAME: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_BASE_SOCKET_URL: string;
  readonly VITE_BASE_VERSION: string;
  readonly VITE_BASE_WEBSOCKET: string;
}

export declare global {
  interface Window {
    BMapGL: any;
  }
}
