import Cookies from "universal-cookie";

class Simgleton {
  static _instance: any = null;

  static getInstance() {
    if (!Simgleton._instance) {
      Simgleton._instance = new Cookies();
    }
    return Simgleton;
  }

  static setCookie(key: string, value: any) {
    Simgleton._instance.set(key, value, { path: "/" });
    return Simgleton;
  }
  static getCookie(key: string) {
    return Simgleton._instance.get(key);
  }
}

export default Simgleton.getInstance();
