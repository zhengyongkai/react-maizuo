import Cookies from 'universal-cookie';

class CookiesInstance {
  static _instance = new Cookies();

  static getInstance() {
    return CookiesInstance;
  }

  static setCookie(key: string, value: any) {
    CookiesInstance._instance.set(key, value, { path: '/' });
    return CookiesInstance;
  }
  static getCookie(key: string) {
    return CookiesInstance._instance.get(key);
  }
  static removeCookie(key: string) {
    return CookiesInstance._instance.remove(key);
  }
}

export default CookiesInstance.getInstance();
