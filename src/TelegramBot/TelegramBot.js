
import { WebhookServer } from '../WebhookServer/WebhookServer';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

dotenv.config();
export const useBot = (() => {
  let bot = null;
  return () => {
    return bot || (bot = new Telegraf(process.env.BOT_TOKEN))
  }
})();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.telegram.setWebhook(process.env.WEBHOOK_URL)

const app = WebhookServer.app;

app.post('/telegram', async (req, res) => {
  await bot.handleUpdate(req.body, res);
});

bot.command('hello', (ctx) => {
  ctx.reply("Hello there!");
})

WebhookServer.start();

console.log("Launched the bot!");
