import { UserAttributes } from "../server/interfaces";

export interface ContextInterface {
  user: null | UserAttributes;
}