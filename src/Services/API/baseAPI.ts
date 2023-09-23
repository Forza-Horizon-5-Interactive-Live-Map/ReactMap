import axios, { AxiosInstance } from 'axios';

export default class BaseApi {
  private static _appAnonymous: AxiosInstance | null;

  static get AppAnonymous() {
    if (!this._appAnonymous) {
      this._appAnonymous = axios.create({
        baseURL: 'https://localhost:7075',
      });
    }
    return this._appAnonymous;
  }
}