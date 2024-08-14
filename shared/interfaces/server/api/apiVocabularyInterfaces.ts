import { VocabularyLanguageAttributes } from "../interfaces";

export interface ApiVocabularyCreationAttributes {
  userId: number;
  sourceLanguageId: string;
  targetLanguageId: string;
}

export interface ApiVocabularyAttributes {
  id: number;
  userId: number;
  sourceLanguage: VocabularyLanguageAttributes
  targetLanguage: VocabularyLanguageAttributes
}