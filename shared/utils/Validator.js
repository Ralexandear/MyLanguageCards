"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
class ValidatorClass {
    checkType(typeExpected, data) {
        const currentType = typeof data;
        if (currentType === typeExpected)
            return;
        throw new TypeError(`Expected type of data is '${typeExpected}', but recieved ${currentType}. Data: ${data}`);
    }
    forString(text) {
        this.checkType('string', text); //if void then value is string
        const string = text;
        return {
            isNotEmpty() {
                return Boolean(string.length);
            },
            length(min, max) {
                if (!exports.Validator.forNumber(min).isPositive()) {
                    throw ValidationError_1.default.lengthAboveZero();
                }
                return max ? exports.Validator.forNumber(string.length).isBetween(min, max) : exports.Validator.forNumber(string.length).isBiggerThan(min);
            },
            isEqualTo(text) {
                return text === string;
            },
            isInList(...text) {
                return text.includes(string);
            }
        };
    }
    forNumber(number) {
        this.checkType('number', number);
        return {
            isPositive() {
                return number > 0;
            },
            isZero() {
                return number === 0;
            },
            isNegative() {
                return number < 0;
            },
            isBiggerThan(numberForComparison) {
                return number > numberForComparison;
            },
            isEqualTo(numberForComparison) {
                return number === numberForComparison;
            },
            isBetween(min, max) {
                if (exports.Validator.forNumber(max).isBiggerThan(min))
                    return number >= min && number <= max;
                throw new ValidationError_1.default(`Parameter 'maximum' must be above zero, but it is not. Min value: ${min}, max val: ${max}`);
            }
        };
    }
}
exports.Validator = new ValidatorClass();
exports.default = exports.Validator;
