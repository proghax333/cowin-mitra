
import WebhookServer from '../WebhookServer/WebhookServer';
import { useAppointmentStore } from '../../lib/appointments/AppointmentStore';
import { useSingleton } from '../../lib/utils/Singleton';
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
const app = WebhookServer.app();

app.post('/telegram', async (req, res) => {
  await bot.handleUpdate(req.body, res);
  res.sendStatus(200);
});

bot.command('hello', (ctx) => {
  ctx.reply(JSON.stringify(ctx));
})
