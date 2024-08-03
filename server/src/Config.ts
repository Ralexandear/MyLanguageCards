import { NodeEnv } from './enums/NodeEnvEnum';

class ConfigClass {
  NODE_ENV: NodeEnv

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV as NodeEnv || 'dev'
  }
}

export const Config = new ConfigClass();
export default Config 