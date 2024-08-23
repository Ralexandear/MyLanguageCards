import { CardAttributes, LanguageAttributes, UserAttributes, VocabularyAttributes,  GroupAttributes} from "@shared/interfaces/server/interfaces";
import { Optional } from "sequelize";

export {CardAttributes, UserAttributes, VocabularyAttributes, LanguageAttributes, GroupAttributes}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | '_role'> {}
export interface VocabularyCreationAttributes extends Optional<VocabularyAttributes, 'id'> {}
export interface CardCreationAttributes extends Optional<CardAttributes, 'id'> {}
export interface LanguageCreationAttributes extends Optional<LanguageAttributes, 'id'> {}
export interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}