import { Optional } from "sequelize";
import { UserRoleType } from "../types/UserRoleType";


export interface UserAttributes {
  id: number;
  _username: string
  _password: string
  _role: string
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | '_role'> {}


export interface VocabularyAttributes {
  id: number;
  userId: number;
  _sourceLanguageLabel: string;
  _targetLanguageLabel: string;
}

export interface VocabularyCreationAttributes extends Optional<VocabularyAttributes, 'id'> {}


export interface CardAttributes {
  id: number;
  vocabularyId: number;
  _source: string;
  _target: string;
}

export interface CardCreationAttributes extends Optional<CardAttributes, 'id'> {}
