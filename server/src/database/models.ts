import { Model } from "sequelize";
import * as Interface from '../interfaces/databaseInterfaces'

import { Length } from "class-validator";
import Validator from "@shared/utils/Validator";
import { UserRoleType } from "@shared/types/UserRoleType";
import ValidationError from "@shared/errors/ValidationError";

export class User extends Model<Interface.UserAttributes, Interface.UserCreationAttributes> implements Interface.UserAttributes {
  readonly id!: number;
  _role!: UserRoleType;
  _password!: string;
  _email!: string;
  readonly _languageId!: number | null


  get role () {
    return this._role
  }

  set role (role: UserRoleType) {
    if (! Validator.forString(role).isInList(...(['admin', 'user'] as UserRoleType[]))) {
      throw ValidationError.validationFailed('Unexpected userRole')
    }

    this._role = role
  }

  get password () {
    return this._password
  }
}



export class Vocabulary extends Model<Interface.VocabularyAttributes, Interface.VocabularyCreationAttributes> implements Interface.VocabularyAttributes{
  readonly id!: number;
  readonly userId!: number;
  readonly _label!: string | null
  readonly _learningLanguageId!: number;



  get learningLanguageId () {
    return this._learningLanguageId
  }
}


export class Language extends Model<Interface.LanguageAttributes, Interface.LanguageCreationAttributes> implements Interface.LanguageAttributes { //
  readonly id!: number;
  readonly _label!: string

  get label () {
    return this._label
  }
}


export class Card extends Model<Interface.CardAttributes, Interface.CardCreationAttributes> implements Interface.CardAttributes{
  readonly id!: number;
  readonly vocabularyId!: number;
  readonly groupId!: number | null;
  readonly _translation!: string;
  readonly _learningWord!: string;

  get learningWord () {
    return this._learningWord
  }


  get translation () {
    return this._translation
  }
  
  delete() {
    return this.destroy()
  }
}



export class Group extends Model<Interface.GroupAttributes, Interface.GroupCreationAttributes> implements Interface.GroupAttributes {
  readonly id!: number;
  _label!: string;

  get label () {
    return this._label
  }

  set label ( label ) {
    Validator.forString(label).length(1, 50)
    this._label = label
  }
}