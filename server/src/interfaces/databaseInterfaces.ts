import { CardAttributes, UserAttributes, VocabularyAttributes, VocabularyLanguageAttributes } from "@shared/interfaces/server/interfaces";
import { Optional } from "sequelize";

export {CardAttributes, UserAttributes, VocabularyAttributes, VocabularyLanguageAttributes}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | '_role' | '_username'> {}
export interface VocabularyCreationAttributes extends Optional<VocabularyAttributes, 'id'> {}
export interface CardCreationAttributes extends Optional<CardAttributes, 'id'> {}
export interface VocabularyLanguageCreationAttributes extends Optional<VocabularyLanguageAttributes, 'id'> {}