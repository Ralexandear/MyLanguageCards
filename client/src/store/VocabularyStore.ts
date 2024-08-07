import { makeAutoObservable } from "mobx";
import { VocabularyAttributes } from "../shared/interfaces/server/interfaces";

export class VocabularyStore {
  private _vocabularies: Map<number, VocabularyAttributes>;

  constructor() {
    this._vocabularies = new Map().set(1, {
      id: 1,
      _name: "Мой словарик",
      _sourceLanguageLabel: "русский",
      _targetLanguageLabel: "английский",
    } as VocabularyAttributes);
    makeAutoObservable(this);
  }
}

export default VocabularyStore;
