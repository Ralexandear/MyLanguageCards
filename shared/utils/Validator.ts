import ValidationError from "../errors/ValidationError";
import { PrimitiveType } from "../types/PrimitiveType";

class ValidatorClass {
  private error: typeof ValidationError
  
  constructor () {
    this.error = ValidationError
  }

  
  checkType(typeExpected: PrimitiveType, data: any) {
    const currentType = typeof data
    
    if (currentType === typeExpected) return
    throw new TypeError(`Expected type of data is '${typeExpected}', but recieved ${currentType}. Data: ${data}`)
  }

  
  forString(string: string) {
    const isNotEmpty = () => Boolean(string)
    const isEqualTo = (text: string) => text === string
    const isInList = (...text: string[]) => text.includes(string)

    const length = (min: number, max?: number) => {
      if (! this.forNumber(min).isPositive()) {
        throw this.error.lengthAboveZero();
      }

      return max ? this.forNumber(string.length).isBetween(min, max) : this.forNumber(string.length).isBiggerThan(min)
    }


    
    return {isNotEmpty, isEqualTo, isInList, length}
  }

  forNumber(number: number) {
    const isPositive = () => number > 0

    const isZero = () => number === 0
    const isNegative = () => number < 0
    const isBiggerThan = (numberForComparison: number) => number > numberForComparison
    const isEqualTo = (numberForComparison: number) => number === numberForComparison
    const isBetween = (min: number, max: number) => {
      if (this.forNumber(max).isBiggerThan(min)) return number >= min && number <= max
      throw new this.error(`Parameter 'maximum' must be above zero, but it is not. Min value: ${min}, max val: ${max}`)
    }

    return {
      isPositive, isZero, isNegative, isBetween, isBiggerThan, isEqualTo
    }
  }

}

export const Validator = new ValidatorClass();
export default Validator