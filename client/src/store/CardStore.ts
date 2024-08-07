import { makeAutoObservable } from "mobx";
import { CardAttributes } from "../shared/interfaces/server/interfaces";

export class CardStore {
  private _cards: Map<number, CardAttributes>;

  constructor() {
    this._cards = new Map();

    makeAutoObservable(this);
  }
}

export default CardStore;
