import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "@shared/enums/HttpStatusCodeEnum";
import { ApiError } from "@shared/errors/ApiError";

export function errorHandlingMiddleware (err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message})
  }

  return res.status( HttpStatusCode.InternalServerError ).json({message: 'Unexpected server error!'})
}

export default errorHandlingMiddleware;