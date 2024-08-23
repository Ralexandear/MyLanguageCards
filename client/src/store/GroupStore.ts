import { makeAutoObservable } from "mobx";
import Group from "../models/Group";
import { GroupAttributes } from "../shared/interfaces/server/interfaces";

let id = 1

export class GroupStore {
  private _groups: Array<GroupAttributes>;

  constructor () {
    this._groups = new Array<GroupAttributes>();

    makeAutoObservable(this);

  }

  createGroup (label: string) {
    const group = new Group(label);
    // this._groups.push( group.sync() )
  }

  get list () {
    return this._groups
  }

  addNewGroup (label: string) {
    return this._groups.push({id: id++, _label: label})
  }

}

export default GroupStore