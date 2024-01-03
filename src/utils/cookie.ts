import Cookies from "universal-cookie";

class Simgleton {
  static _instance: any = new Cookies();

  static getInstance() {
    return Simgleton;
  }

  static setCookie(key: string, value: any) {
    Simgleton._instance.set(key, value, { path: "/" });
    return Simgleton;
  }
  static getCookie(key: string) {
    return Simgleton._instance.get(key);
  }
  static removeCookie(key: string) {
    return Simgleton._instance.remove(key);
  }
}

export default Simgleton.getInstance();
