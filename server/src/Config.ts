import path from 'path';
import fs from 'fs'
import { configAttributes } from '@shared/interfaces/configAttributes';

const fileDir = path.resolve(__dirname, '../../config.json');


class ConfigClass {
  private _config: configAttributes;

  constructor() {
    this._config = (() => {
      const configFile = fs.readFileSync(fileDir, 'utf-8');
      return JSON.parse(configFile); // Парсим JSON из файла
    })();
  }

  // Метод для получения значения по ключу
  get(key: keyof configAttributes) {
    return this._config[key];
  }

  // Метод для обновления значения и сохранения файла
  set(key: keyof configAttributes, value: any) {
    this._config[key] = value;
    this.saveConfig();
  }

  // Метод для сохранения конфигурации в файл
  saveConfig() {
    try {
      fs.writeFileSync(fileDir, JSON.stringify(this._config, null, 2), 'utf-8');
    } catch (error) {
      console.error('Ошибка сохранения конфигурации:', error);
    }
  }
}

export const Config = new ConfigClass()
export default Config;