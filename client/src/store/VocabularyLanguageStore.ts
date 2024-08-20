import { threadId } from "worker_threads"
import { VocabularyLanguageAttributes } from "../shared/interfaces/server/interfaces"


export class VocabularyLanguageStore {
  private _list = Array<VocabularyLanguageAttributes>()
  
  constructor() {
    const languageList = this._list = new Array<VocabularyLanguageAttributes>()

    languageList.push({id: 1, _label: "🇬🇧 English"}, {id: 2, _label: "🇷🇺 Русский"}, {id: 3, _label: "🇷🇸 Srbski"})
  }

  get list () {
    return this._list
  }

  getById (id: number) {
    const language = this._list.find(e => e.id === id);
    if (language) return language
    throw new Error(`Language with id ${id} not found!`)
  }
}