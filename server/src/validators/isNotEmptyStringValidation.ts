import Validator from "@shared/utils/Validator";

export const isNotEmptyStringValidation = (data: any) => Validator.forString(data).isNotEmpty()
export default isNotEmptyStringValidation
