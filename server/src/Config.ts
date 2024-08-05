import { NodeEnv } from './enums/NodeEnvEnum';
import Validator from './validators/Validator';
const ENV = process.env

const checkedValue = (value: string | undefined) => {
  if (value) return value
  throw new Error('Unexpected config parameters!')
}
class ConfigClass {
  NODE_ENV: NodeEnv
  SECRET_KEY: string

  constructor() {
    this.NODE_ENV = ENV.NODE_ENV as NodeEnv || 'dev'
    this.SECRET_KEY = checkedValue( ENV.SECRET_KEY )
  }
}

export const Config = new ConfigClass();
export default Config 