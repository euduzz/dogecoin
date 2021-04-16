import schedule from 'node-schedule';
import Bot from './tools/bot';
const bot = new Bot()

schedule.scheduleJob("0 6-19 * * *", (async function() {
  bot.init()
}))