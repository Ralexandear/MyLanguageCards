import { makeAutoObservable } from "mobx";
import { VocabularyAttributes } from "../shared/interfaces/server/interfaces";
import { ApiVocabularyAttributes } from "../shared/interfaces/server/api/apiVocabularyInterfaces";

export class UserStore {
  private _isAuth: boolean;
  private _user: any;
  private _selectedVocabularyId: number | null

  constructor() {
    this._isAuth = false;
    this._user = null;
    this._selectedVocabularyId = null

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

  get selectedVocabularyId() {
    return this._selectedVocabularyId
  }

  set selectedVocabularyId( vocabularyId ) {
    this._selectedVocabularyId = vocabularyId
  }
}

export default UserStore;
