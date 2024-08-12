import { Model } from "sequelize";
import * as Interface from '../interfaces/databaseInterfaces'

import { Length } from "class-validator";
import Validator from "@shared/utils/Validator";
import { UserRoleType } from "@shared/types/UserRoleType";
import ValidationError from "@shared/errors/ValidationError";

export class User extends Model<Interface.UserAttributes, Interface.UserCreationAttributes> {
  readonly id!: number;
  private _username!: string;
  private _role!: UserRoleType;
  private _password!: string;

  get username () {
    return this._username
  }

  set username (username: string) {
    if (! Validator.forString(username).length(3, 30)) {
      throw new ValidationError('Username length must be between 3 and 30, but it is ' + username.length);
    }

    this._username = username;
  }

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
  readonly _sourceLanguageId!: number;
  readonly _targetLanguageId!: number;



  get sourceLanguageId () {
    return this._sourceLanguageId
  }

  get targetLanguageId () {
    return this._targetLanguageId
  }
}


export class VocabularyLanguage extends Model<Interface.VocabularyLanguageAttributes, Interface.VocabularyLanguageCreationAttributes> implements Interface.VocabularyLanguageAttributes{
  readonly id!: number;
  readonly _label!: string

  get label () {
    return this._label
  }
}


export class Card extends Model<Interface.CardAttributes, Interface.CardCreationAttributes> {
  readonly id!: number;
  readonly vocabularyId!: number;
  
  @Length(1, 200)
  private _source!: string;
  
  @Length(1, 200)
  private _target!: string;

  get source () {
    return this._source
  }

  set source (word: string) {
    if (! Validator.forString(word).length(1, 200)) {
      throw ValidationError.unexpectedLength(word.length)
    }

    this._source = word
  }

  get target () {
    return this._target
  }

  set target (word: string) {
    if (! Validator.forString(word).length(1, 200)) {
      throw ValidationError.unexpectedLength(word.length)
    }

    this._target = word
  }
}