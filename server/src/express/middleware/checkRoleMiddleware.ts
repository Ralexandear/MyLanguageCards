import { NextFunction, Request, Response } from "express";
import { UserRoleType } from "../../types/UserRoleType";
import { RequestWithUserAttributes } from "../../interfaces/api/apiInterfaces";
import { ApiError } from "../../errors/ApiError";

export function checkRoleMiddleware (role: UserRoleType) {
  return function(req: RequestWithUserAttributes, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      return next()
    }

    try {
      const userRole = req.userAttributes.role
      if (role !== userRole) {
        return next( ApiError.forbidden('You must be logged as administrator to get access to this method') )
      }
      next();
    } catch(err) {
      return next( ApiError.internal() )
    }
  }
}