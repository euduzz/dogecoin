'use strict';
require('dotenv').config()
import axios from 'axios';
class Currency {
  constructor() {}

  async get() {
    return await axios.get(process.env.API_URL)
  }
}

export default Currency