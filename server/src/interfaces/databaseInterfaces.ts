import { Optional } from "sequelize";


export interface UserAttributes {
  id: number;
  username: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}