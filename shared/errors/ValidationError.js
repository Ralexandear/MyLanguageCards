"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
    static lengthAboveZero() {
        return new ValidationError('Min length must be above zero!');
    }
    static validationFailed(...text) {
        const message = 'Validation failed!';
        return new ValidationError(text.length ? message + ' ' + text.join(', ') + ';' : message);
    }
    static valueIsEmpty() {
        return new ValidationError('Presented value is empty');
    }
    static unexpectedLength(length) {
        return new ValidationError('Unexpected length ' + length);
    }
}
exports.ValidationError = ValidationError;
exports.default = ValidationError;
