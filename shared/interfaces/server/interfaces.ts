


export interface UserAttributes {
  id: number;
  _email: string;
  _username: string
  _password: string
  _role: string
}

export interface VocabularyLanguageAttributes {
  id: number;
  _label: string | null;
}

export interface VocabularyAttributes {
  id: number;
  userId: number;
  
  _label: string | null;
  _sourceLanguageId: number;
  _targetLanguageId: number;
}



export interface CardAttributes {
  id: number;
  vocabularyId: number;
  _source: string;
  _target: string;
}

