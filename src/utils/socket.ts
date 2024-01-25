import { Socket, io } from "socket.io-client";

class socketIo {
  static _instance: Socket | null;

  static getInstance() {
    return this._instance;
  }

  /**
   * @description: 链接socket 并且返回单例
   * @param {object} query
   * @return {*}
   */
  static connect(query: { token: string }) {
    if (!this._instance) {
      this._instance = io(import.meta.env.VITE_BASE_WEBSOCKET, {
        query,
      }).on("connect", () => {
        console.log("已经成功链接上socket");
      });
    }
    return this._instance;
  }

  /**
   * @description: 发送消息
   * @param {string} event
   * @param {unknown} data
   * @return {*}
   */
  static emit(event: string, data: unknown) {
    if (this._instance) {
      this._instance.emit(event, data);
    }
  }

  /**
   * @description: 断开连接 （token过期等）
   * @return {*}
   */
  static disconnect() {
    if (this._instance) {
      this._instance.disconnect();
      this._instance = null;
    }
  }
}

export default socketIo;
