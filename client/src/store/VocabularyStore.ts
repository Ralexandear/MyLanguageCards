import { makeAutoObservable } from "mobx";
import { VocabularyAttributes } from "../shared/interfaces/server/interfaces";
import { ApiVocabularyCreationAttributes } from "../shared/interfaces/server/api/apiVocabularyInterfaces";
import { VocabularyLanguageStore } from "./VocabularyLanguageStore";
import UserStore from "./UserStore";

let id = 1

export class VocabularyStore {
  // private _user: UserStore
  private _vocabularies: Array<VocabularyAttributes>;
  private _languages: VocabularyLanguageStore

  constructor() {
    this._vocabularies = new Array<VocabularyAttributes>()
    this._languages = new VocabularyLanguageStore()
    // this._user = user

    makeAutoObservable(this);
  }

  addVocabulary( vocabulary: ApiVocabularyCreationAttributes ){
    const vocId = id++
    this._vocabularies.push({id: vocId, _sourceLanguageId: vocabulary.sourceLanguageId, _targetLanguageId: vocabulary.targetLanguageId, userId: 1, _label: null})
  }

  // get languageList () {
  //   return this._languages.list
  // }

  get languageList () {
    return Object.fromEntries( this._languages.list.map(e => [e.id, e._label]))
  }

  get list () {
    return this._vocabularies
  }

  get languages () {
    return this._languages
  }

  getById (id: number) {
    const vocabulary = this._vocabularies.find(e => e.id === id)
    if (vocabulary) return vocabulary
    throw new Error(`Vocabulary with id ${id} not found!`)
  }
}

export default VocabularyStore;
