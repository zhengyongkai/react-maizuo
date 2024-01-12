import { createContext } from 'react';
import { io } from 'socket.io-client';
class SocketInstance {
  static _instance = io(import.meta.env.VITE_BASE_SOCKET_URL);

  static getInstance() {
    return SocketInstance;
  }

  static disconnect() {
    return SocketInstance._instance.disconnect();
  }
}

export default SocketInstance.getInstance();
