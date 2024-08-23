import { makeAutoObservable } from "mobx";

export class UserStore {
  private _isAuth: boolean;
  private _user: any;
  private _primaryLanguageId: number | null
  private _selectedVocabularyId: number | null

  constructor() {
    this._isAuth = false;
    this._user = null;
    this._primaryLanguageId = null
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

  get primaryLanguageId () {
    return this._primaryLanguageId
  }

  set primaryLanguageId( languageId ) {
    this._primaryLanguageId = languageId
  }

  get selectedVocabularyId () {
    return this._selectedVocabularyId
  }

  set selectedVocabularyId ( vocabularyId ) {
    this._selectedVocabularyId = vocabularyId
  }
}

export default UserStore;
