


export interface UserAttributes {
  id: number;
  _email: string;
  _password: string
  _role: string
  _languageId: number | null
}

export interface LanguageAttributes {
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
  groupId: number | null;
  _translation: string;
  _learningWord: string;
}


export interface GroupAttributes {
  id: number;
  _label: string;
}

