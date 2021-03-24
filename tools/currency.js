'use strict';
require('dotenv').config()
const axios = require('axios');

module.exports = class Currency {

  async get() {
    return await axios.get(process.env.API_URL)
  }

}