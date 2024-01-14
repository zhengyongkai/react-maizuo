import { Socket, io } from 'socket.io-client';

class socketIo {
  static _instance: Socket | null;

  static getInstance() {
    return this._instance;
  }

  static connect(query: { token: string }) {
    if (!this._instance) {
      this._instance = io('http://localhost:3002/', {
        query,
      }).on('connect', () => {
        console.log('连接陈工');
      });
      // 进入房间
      this._instance.emit('join');
    }
    return this._instance;
  }

  static emit(event: string, data: unknown) {
    if (this._instance) {
      this._instance.emit(event, data);
    }
  }

  static disconnect() {
    if (this._instance) {
      this._instance.disconnect();
      this._instance = null;
    }
  }
}

export default socketIo;
