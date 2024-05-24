import Cookies from 'universal-cookie';

/**
 * @description: cookie 的单例模式
 * @return {*} CookieInstance
 */
class CookieInstance {
  static _instance: any = new Cookies();

  static getInstance() {
    return CookieInstance;
  }

  /**
   * @description: 设置Cookie
   * @param {string} key
   * @param {unknown} value
   * @return {*}
   */
  static setCookie(key: string, value: unknown) {
    CookieInstance._instance.set(key, value, { path: '/' });
    return CookieInstance;
  }

  /**
   * @description: 获取Cookie
   * @param {string} key
   * @return {*}
   */
  static getCookie(key: string) {
    return CookieInstance._instance.get(key);
  }

  /**
   * @description: 移除Cookie
   * @param {string} key
   * @return {*}
   */
  static removeCookie(key: string) {
    return CookieInstance._instance.remove(key);
  }
}

export default CookieInstance.getInstance();
