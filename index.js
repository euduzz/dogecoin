const Bot = require('./tools/bot');
const schedule = require('node-schedule');

schedule.scheduleJob("*/5 7-19 * * *", (async function() {
  Bot.init()
}))