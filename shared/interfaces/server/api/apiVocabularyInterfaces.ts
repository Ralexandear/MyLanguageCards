export interface ApiVocabularyCreationAttributes {
  userId: number;
  sourceLanguageLabel: string;
  targetLanguageLabel: string;
}

export interface ApiVocabularyEditAttributes {
  vocabularyId: number;
  name?: string;
  sourceLanguageLabel?: string;
  targetLanguageLabel?: string;
}