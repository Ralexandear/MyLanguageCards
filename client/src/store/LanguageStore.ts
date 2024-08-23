import { threadId } from "worker_threads"
import { LanguageAttributes } from "../shared/interfaces/server/interfaces"


export class VocabularyLanguageStore {
  private _list = Array<LanguageAttributes>()
  
  constructor() {
    const languageList = this._list = new Array<LanguageAttributes>()

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