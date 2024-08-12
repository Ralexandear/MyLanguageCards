import { NodeEnv } from '@shared/enums/NodeEnvEnum';
import { EnvKeysType } from '@shared/types/EnvKeysType';
import Validator from '@shared/utils/Validator';

const getFromEnv = (key: EnvKeysType, defaultValue?: string) => {
  const ENV = process.env
  const value = ENV[key];

  if (value) return value
  else if (defaultValue) return ENV[key] = defaultValue;
  
  throw new Error('Unexpected config parameters!')
}



class EnvClass {
  NODE_ENV: NodeEnv
  SECRET_KEY: string

  constructor() {
    this.NODE_ENV = getFromEnv('NODE_ENV', 'dev') as NodeEnv;
    this.SECRET_KEY = getFromEnv('SECRET_KEY')
  }
}

export const Env = new EnvClass();
export default Env 