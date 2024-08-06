import { HttpStatusCode } from "@shared/enums/HttpStatusCodeEnum";

export class ApiError extends Error {
  status: HttpStatusCode;
  message: string;

  constructor(status: HttpStatusCode, message: string) {
    super();
    this.status = status;
    this.message = message
  }

  static badRequest(message = 'Bad request') {
    return new ApiError(HttpStatusCode.BadRequest, message)
  }

  static internal(message = 'Internal error occured!') {
    return new ApiError(HttpStatusCode.InternalServerError, message)
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(HttpStatusCode.Forbidden, message)
  }

  static unathorized(message = 'Unathorized') {
    return new ApiError(HttpStatusCode.Unauthorized, message)
  }

  static user () {
    return Object.freeze({
      alreadyExist() {
        return ApiError.badRequest('User with presented email alreadyExist')
      },

      notFound () {
        return ApiError.internal('User not found')
      },

      wrongPassword () {
        return ApiError.internal('Wrong password')
      }
    })
  }

}