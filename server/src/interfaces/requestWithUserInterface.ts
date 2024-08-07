import { Request } from "express";
import { JWTUserAttributes } from "@shared/interfaces/server/api/apiUserInterfaces";

export interface RequestWithUserAttributes extends Request {
  userAttributes: JWTUserAttributes
}