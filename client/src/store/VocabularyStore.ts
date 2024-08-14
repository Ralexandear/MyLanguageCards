import { makeAutoObservable } from "mobx";
import { VocabularyAttributes } from "../shared/interfaces/server/interfaces";

export class VocabularyStore {
  private _vocabularies: Map<number, VocabularyAttributes>;

  constructor() {
    this._vocabularies = new Map()
    makeAutoObservable(this);
  }
}

export default VocabularyStore;
