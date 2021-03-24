'use strict';
require('dotenv').config()
var Twit = require('twit')
 
var instance = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000,
})

const post = (message) => {
  instance.post('statuses/update', { status: message }, status())
}

const status = (error, response) => {
  if (error) {
    console.log('Fala ao realizar o tweet', error);
  }
  else {
    console.log('Tweet realizado com sucesso', response);
  }
}

module.exports = {
  post,
  status
}