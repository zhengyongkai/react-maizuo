import { Socket, io } from "socket.io-client";

class socketIo {
  static _instance: Socket | null;

  static getInstance() {
    return this._instance;
  }

  static connect(query: { token: string }) {
    if (!this._instance) {
      this._instance = io("http://localhost:3001/", {
        query,
      });
    }
    return this._instance;
  }

  static disconnect() {
    if (this._instance) {
      this._instance.disconnect();
      this._instance = null;
    }
  }
}

export default socketIo;
