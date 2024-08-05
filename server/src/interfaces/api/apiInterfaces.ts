import { Request } from "express";
import { JWTUserAttributes } from "./apiUserInterfaces";

export interface RequestWithUserAttributes extends Request {
  userAttributes: JWTUserAttributes
}