import { Model } from "sequelize";
import * as Inteface from '../interfaces/databaseInterfaces'
import { Length } from "class-validator";

export class User extends Model<Inteface.UserAttributes, Inteface.UserCreationAttributes> implements Inteface.UserAttributes {
  readonly id!: number;
  @Length(3, 30)
  username!: string;
}