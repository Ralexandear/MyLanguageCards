import { PrimitiveType } from "../types/PrimitiveType";

class ValidatorClass {
  checkType(typeExpected: PrimitiveType, data: any) {
    const currentType = typeof data
    
    if (currentType === typeExpected) return
    throw new TypeError(`Expected type of data is '${typeExpected}', but recieved ${currentType}. Data: ${data}`)
  }

  isNotEmptyString (data: any) {
    this.checkType('string', data)
    
    if (data.length) return true;
    throw new ValidationError('Presented value is empty')
  }
}

export const Validator = new ValidatorClass();
export default Validator