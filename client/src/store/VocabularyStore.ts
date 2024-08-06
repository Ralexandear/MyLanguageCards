import { makeAutoObservable } from "mobx";

export class VocabularyStore {
  private _vocabularies: Map<number, any>

  constructor() {
    this._vocabularies = new Map()
    
    makeAutoObservable(this)
  }

}

export default VocabularyStore;