import Cookies from "js-cookie";

export default class CookieService {
  static setCookie(
    name: string,
    value: string,
    options?: Cookies.CookieAttributes
  ) {
    Cookies.set(name, value, options);
  }

  static getCookie(name: string): string | undefined {
    return Cookies.get(name);
  }

  static removeCookie(name: string, options?: Cookies.CookieAttributes) {
    Cookies.remove(name, options);
  }
}
