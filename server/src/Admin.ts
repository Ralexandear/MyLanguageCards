import 'dotenv/config';
import Utilities from './utilities/Utilities';
import Validator from './validators/Validator';
import TelegramBot from 'node-telegram-bot-api';
const ENV = process.env;

const BotToken = Utilities.getFromEnv('BOT_TOKEN', Validator.isNotEmptyString)
const Bot = new TelegramBot(BotToken)

class AdminClass {
  private readonly telegramId: string

  constructor(){
    this.telegramId = Utilities.getFromEnv('ADMIN_TELEGRAM_ID', Validator.isNotEmptyString);
  }

  async sendMessage(text: string) {
    return Bot.sendMessage(this.telegramId, text)
  }
}

export const Admin = new AdminClass();
export default Admin