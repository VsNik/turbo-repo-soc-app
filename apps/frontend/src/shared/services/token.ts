import { ACCESS_TOKEN } from "@shared/types";

export class Token {
  static getAccessToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return accessToken ?? null;
  }

  static setAccessToken(accessToken: string) {
    if (!accessToken) return;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  static removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  }
}
