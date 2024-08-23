import ValidationError from "../shared/errors/ValidationError";
import { GroupAttributes } from "../shared/interfaces/server/interfaces";
import Validator from "../shared/utils/Validator";

const checkLabel = (label: string) => {
  try {
    // Печать для отладки
    console.log("Validating label:", label);
    // Проверяем длину строки
    const a = ValidationError
    // if (Validator.forString(label).length(0, 50)) {
    //   return label;
    // }
    console.error("Label validation failed.");
    // throw ValidationError.validationFailed();
  } catch (error) {
    console.error("Error in checkLabel:", error);
    throw error; // Перебрасываем исключение дальше
  }
}


let id = 1


export default class Group {
  private _label: string;
  
  constructor (label: string) {
    this._label = label
  }

  get label () {
    return this._label
  }

  // sync () {
  //   return {id: id++, _label: this.label} as GroupAttributes
  // }
}