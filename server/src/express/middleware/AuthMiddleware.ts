import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import Config from "../../Config";
import { JWTUserAttributes } from "@shared/interfaces/server/api/apiUserInterfaces";
import { RequestWithUserAttributes } from "../../interfaces/requestWithUserInterface";
import { ApiError } from "@shared/errors/ApiError";

const getJwtToken = (header: string | undefined) => {
  if (! header) throw new Error('Header is missing');
  if (! /bearer [a-z0-9.]+/i.test(header)) throw new Error('Token is corrupt')

  return header.replace(/bearer /i, '');
}


export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    console.log(req.headers)
    const token = getJwtToken(req.headers.authorization || req.headers['Authorization']?.toString())
    const decodedData = jwt.verify(token, Config.SECRET_KEY) as JWTUserAttributes
    (req as unknown as RequestWithUserAttributes).userAttributes = decodedData
    next()
  } catch(err) {
    console.log(err)
    return next( ApiError.unathorized() )
  }
}