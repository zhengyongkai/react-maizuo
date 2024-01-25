import Cookies from "universal-cookie";

/**
 * @description: cookie 的单例模式
 * @return {*} CookieInstance
 */
class CookieInstance {
  static _instance: any = new Cookies();

  static getInstance() {
    return CookieInstance;
  }

  static setCookie(key: string, value: unknown) {
    CookieInstance._instance.set(key, value, { path: "/" });
    return CookieInstance;
  }

  static getCookie(key: string) {
    return CookieInstance._instance.get(key);
  }

  static removeCookie(key: string) {
    return CookieInstance._instance.remove(key);
  }
}

export default CookieInstance.getInstance();
