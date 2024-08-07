import { makeAutoObservable } from "mobx";

export class UserStore {
  private _isAuth: boolean;
  private _user: any;

  constructor() {
    this._isAuth = false;
    this._user = null;

    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}

export default UserStore;
