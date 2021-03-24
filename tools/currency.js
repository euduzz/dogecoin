'use strict';
require('dotenv').config()
const axios = require('axios');

const get = async() => {
  return await axios.get(process.env.API_URL)
}

module.exports = {
  get,
}