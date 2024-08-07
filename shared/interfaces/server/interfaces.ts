


export interface UserAttributes {
  id: number;
  _email: string;
  _username: string
  _password: string
  _role: string
}



export interface VocabularyAttributes {
  id: number;
  userId: number;
  _name: string | null;
  _sourceLanguageLabel: string;
  _targetLanguageLabel: string;
}



export interface CardAttributes {
  id: number;
  vocabularyId: number;
  _source: string;
  _target: string;
}

