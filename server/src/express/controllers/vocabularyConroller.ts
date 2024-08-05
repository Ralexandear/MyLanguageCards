import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors/ApiError";
import { HttpStatusCode } from "../../enums/HttpStatusCodeEnum";
import VocabularyDatabaseController from "../../database/controllers/vocabularyDatabaseController";
import { ApiVocabularyCreationAttributes, ApiVocabularyEditAttributes } from "../../interfaces/api/apiVocabularyInterfaces";

class VocabularyControllerClass {
  async create(req: Request, res: Response, next: NextFunction) {
    const queryHasCreationAttributes = (obj: any): obj is ApiVocabularyCreationAttributes => {
      return (
        typeof obj.userId === 'number' &&
        typeof obj.sourceLanguageLabel === 'string' &&
        typeof obj.targetLanguageLabel === 'string'
      );
    };

    if (! queryHasCreationAttributes(req.body)) {
      return next(ApiError.badRequest('One of the required keys userId, sourceLanguageLabel, targetLanguageLabel is missing!'));
    }

    const { userId, sourceLanguageLabel, targetLanguageLabel } = req.body;

    try {
      const {vocabulary, isNew} = await VocabularyDatabaseController.findOrCreate(userId, sourceLanguageLabel, targetLanguageLabel as string);
      return res.status(HttpStatusCode.OK).json({ vocabulary, isNew });
    } catch (err) {
      return next(err)
    }
  }


  async getUserVocabularies(req: Request, res: Response, next: NextFunction) {
    const {userId} = req.query;

    if (! userId) {
      return next(ApiError.badRequest('Required query parameter "userId" is missing!'));
    }

    try {
      const vocabularies = await VocabularyDatabaseController.getUserVocabularies( +userId );
      return res.status( HttpStatusCode.OK ).json(vocabularies)
    } catch (err) {
      return next(err)
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    const queryHasEditAttributes = (obj: any): obj is ApiVocabularyEditAttributes => {
      if (! ( typeof obj.userId === 'number' )) return false
      else if ([obj.sourceLanguageLabel, obj.targetLanguageLabel].some(e => e && typeof e === 'string')) return true
      return false
    };

    if (! queryHasEditAttributes(req.body)) {
      return next(ApiError.badRequest('One of the required keys userId, sourceLanguageLabel, targetLanguageLabel is missing!'));
    }

    const { userId, sourceLanguageLabel, targetLanguageLabel } = req.body;

    try {
      const {vocabulary, isNew} = await VocabularyDatabaseController.findOrCreate(userId, sourceLanguageLabel, targetLanguageLabel as string);
      return res.status(HttpStatusCode.OK).json({ vocabulary, isNew });
    } catch (err) {
      return next(err)
    }
  }
}

export const VocabularyController = new VocabularyControllerClass();
export default VocabularyController;