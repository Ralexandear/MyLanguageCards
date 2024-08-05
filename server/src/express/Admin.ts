import 'dotenv/config';
import Validator from '../validators/Validator';
import TelegramBot from 'node-telegram-bot-api';
import isNotEmptyStringValidation from '../validators/isNotEmptyStringValidation';
import Utilities from '../utilities/Utilities';
const ENV = process.env;

const BotToken = Utilities.getFromEnv('BOT_TOKEN', isNotEmptyStringValidation)
const Bot = new TelegramBot(BotToken)

class AdminClass {
  private readonly telegramId: string

  constructor(){
    this.telegramId = Utilities.getFromEnv('ADMIN_TELEGRAM_ID', isNotEmptyStringValidation);
  }

  async sendMessage(text: string) {
    return Bot.sendMessage(this.telegramId, text)
  }
}

export const Admin = new AdminClass();
export default Admin