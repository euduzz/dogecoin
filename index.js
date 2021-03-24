require('dotenv').config()
const express = require('express');
const app = express();

import Bot from './tools/bot';
const schedule = require('node-schedule');

schedule.scheduleJob("*/30 7-19 * * *", (async function() {
  Bot.init()
}))

app.listen(() => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})