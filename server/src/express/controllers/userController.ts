import { NextFunction, Request, Response } from "express"
import { ApiError } from "../../errors/ApiError";
import { HttpStatusCode } from "../../enums/HttpStatusCodeEnum";
import { ApiUserAuthAttributes, JWTUserAttributes } from "../../interfaces/api/apiUserInterfaces";
import Validator from "../../validators/Validator";
import jwt from 'jsonwebtoken'
import UserDatabaseController from "../../database/controllers/userDatabaseController";
import Config from "../../Config";
import { User } from "../../database/models";
import bcrypt from 'bcrypt'
import { RequestWithUserAttributes } from "../../interfaces/api/apiInterfaces";


const generateJWT = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role
    } as JWTUserAttributes,
    Config.SECRET_KEY,
    { expiresIn:  '24h'}
  )
}


const isUserAuthBody = (object: any) : object is ApiUserAuthAttributes => {
  return (
    typeof object.email === 'string'
    &&
    typeof object.password === 'string'
    &&
    Validator.forString(object.email).isNotEmpty()
    &&
    Validator.forString(object.password).isNotEmpty()
  )
}

const isRequestWithUserAttributes = (obj: any) : obj is RequestWithUserAttributes => {
  return obj.userAttributes ? true : false
}



class UserControllerClass {
  async register(req: Request, res: Response, next: NextFunction) {
    if (! isUserAuthBody(req.body)){
      return next( ApiError.badRequest() )
    }

    const {email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 5)
    const {user, isNew} = await UserDatabaseController.findOrCreate(email, hashedPassword);

    if (! isNew) {
      return next( ApiError.user().alreadyExist() )
    }
    
    const token = generateJWT(user)
    res.status( HttpStatusCode.OK ).json({token})
  }

  async login(req: Request, res: Response, next: NextFunction) {
    if (! isUserAuthBody(req.body)){
      return next( ApiError.badRequest() )
    }

    const {email, password} = req.body
    const user = await UserDatabaseController.find(email);

    if (! user) {
      return next( ApiError.user().notFound() )
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (! comparePassword) {
      return next( ApiError.user().alreadyExist() );
    }

    const token = generateJWT(user);
    res.status( HttpStatusCode.OK ).json({token})
  }

  async check(req: Request, res: Response, next: NextFunction) {
    if (! isRequestWithUserAttributes(req)) {
      return next( new Error('Request is not Request with userAttributes'))
    }

    const userAttributes = req.userAttributes
    res.status( HttpStatusCode.OK ).json({message: "Oki doki"})
  }
}

export const UserController = new UserControllerClass()
export default UserController