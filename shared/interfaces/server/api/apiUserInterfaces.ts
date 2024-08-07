import { UserRoleType } from "../../../types/UserRoleType";

export interface ApiUserAuthAttributes {
  email: string;
  password: string
}

export interface JWTUserAttributes {
  id: number;
  role: UserRoleType;
}