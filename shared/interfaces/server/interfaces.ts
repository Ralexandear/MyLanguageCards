


export interface UserAttributes {
  id: number;
  _email: string;
  _username: string
  _password: string
  _role: string
  // _language: 
}

export interface VocabularyLanguageAttributes {
  id: number;
  _label: string;
}

export interface VocabularyAttributes {
  id: number;
  userId: number;
  
  _label: string | null;
  _learningLanguageId: number;
}



export interface CardAttributes {
  id: number;
  vocabularyId: number;
  _source: string;
  _target: string;
}

