import { makeAutoObservable } from "mobx";
import { VocabularyAttributes } from "../shared/interfaces/server/interfaces";
import { ApiVocabularyAttributes } from "../shared/interfaces/server/api/apiVocabularyInterfaces";

export class UserStore {
  private _isAuth: boolean;
  private _user: any;
  private _selectedVocabulary: ApiVocabularyAttributes | null

  constructor() {
    this._isAuth = false;
    this._user = null;
    this._selectedVocabulary = null

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

  get selectedVocabulary() {
    return this._selectedVocabulary
  }

  set selectedVocabulary( vocabulary ) {
    this._selectedVocabulary = vocabulary
  }
}

export default UserStore;
