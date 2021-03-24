require('dotenv').config()
const express = require('express');
const app = express();

const Bot = require('./tools/bot');
const schedule = require('node-schedule');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

schedule.scheduleJob("*/30 7-19 * * *", (async function() {
  Bot.init()
}))

app.listen(() => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})