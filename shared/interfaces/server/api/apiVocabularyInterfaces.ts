import { VocabularyLanguageAttributes } from "../interfaces";

export interface ApiVocabularyCreationAttributes {
  userId: number;
  sourceLanguageId: number;
  targetLanguageId: number;
}

export interface ApiVocabularyAttributes {
  id: number;
  userId: number;
  sourceLanguage: VocabularyLanguageAttributes
  targetLanguage: VocabularyLanguageAttributes
}