'use strict';
require('dotenv').config()
import Twit from 'twit';

var instance = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000,
})

class Twitter {
  constructor() {}

  post(message) {
    instance.post('statuses/update', { status: message }, function(err) {
      if (err) {
        console.log('Fala ao realizar o tweet', err);
      }
    })
  }
}

export default Twitter;