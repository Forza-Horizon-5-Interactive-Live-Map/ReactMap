import axios, { AxiosInstance } from 'axios';

export default class BaseApi {
  private static _appAnonymous: AxiosInstance | null;

  static get AppAnonymous() {
    if (!this._appAnonymous) {
      this._appAnonymous = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
      });
    }
    return this._appAnonymous;
  }
}