import 'dotenv/config';
import { EnvKeysType } from "../types/EnvKeysType";

const ENV = process.env;

class UtilitiesClass {
  getFromEnv(key: EnvKeysType, validator?: (data: any) => boolean) {
    const value = ENV[ key ] || '';
    validator && validator(value); //checking data

    return value;
  }
}

export const Utilities = new UtilitiesClass();
export default Utilities;