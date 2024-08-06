import ValidationError from "../errors/ValidationError";
import { PrimitiveType } from "../types/PrimitiveType";

class ValidatorClass {
  checkType(typeExpected: PrimitiveType, data: any) {
    const currentType = typeof data
    
    if (currentType === typeExpected) return
    throw new TypeError(`Expected type of data is '${typeExpected}', but recieved ${currentType}. Data: ${data}`)
  }

  forString(text: any) {
    this.checkType('string', text); //if void then value is string
    const string = text as string

    return {
      isNotEmpty () {
        return Boolean(string.length)
      },

      length (min: number, max?: number) {
        if (! Validator.forNumber(min).isPositive()) {
          throw ValidationError.lengthAboveZero();
        }

        return max ? Validator.forNumber(string.length).isBetween(min, max) : Validator.forNumber(string.length).isBiggerThan(min)
      },

      isEqualTo(text: string) {
        return text === string
      },

      isInList(...text: string[]){
        return text.includes(string)
      }
    }
  }

  forNumber(number: any) {
    this.checkType('number', number);

    return {
      isPositive () {
        return number > 0
      },

      isZero () {
        return number === 0
      },

      isNegative () {
        return number < 0
      },

      isBiggerThan(numberForComparison: number) {
        return number > numberForComparison
      },

      isEqualTo(numberForComparison: number){
        return number === numberForComparison
      },

      isBetween(min: number, max: number) {
        if (Validator.forNumber(max).isBiggerThan(min)) return number >= min && number <= max
        throw new ValidationError(`Parameter 'maximum' must be above zero, but it is not. Min value: ${min}, max val: ${max}`)
      }
  
    }
  }

}

export const Validator = new ValidatorClass();
export default Validator