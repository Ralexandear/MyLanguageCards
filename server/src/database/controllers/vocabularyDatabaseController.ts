import { Vocabulary } from "../models";

class VocabularyDatabaseControllerClass {
  async findOrCreate (userId: number, sourceLanguageLabel: string, targetLanguageLabel: string) {
    return Vocabulary.findOrCreate({where: {userId, _sourceLanguageLabel: sourceLanguageLabel, _targetLanguageLabel: targetLanguageLabel}})
      .then(([vocabulary, isNew]) => ({vocabulary, isNew}));
  }

  async getUserVocabularies(userId: number) {
    return Vocabulary.findAll({where: {userId}})
  }

  // async edit(userId: number, sourceLanguageLabel: string, targetLanguageLabel: string)
}

export const VocabularyDatabaseController = new VocabularyDatabaseControllerClass()
export default VocabularyDatabaseController;