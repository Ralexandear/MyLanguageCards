import { makeAutoObservable } from "mobx";

export class CardStore {
  private _cards: Map<number, >

  constructor() {
    this._cards = new Map()
    
    makeAutoObservable(this)
  }

}

export default CardStore;