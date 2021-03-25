const Bot = require('./tools/bot');
const schedule = require('node-schedule');

// schedule.scheduleJob("*/30 7-19 * * *", (async function() {
//   Bot.init()
// }))

schedule.scheduleJob("* * * * *", (async function() {
  Bot.init()
}))