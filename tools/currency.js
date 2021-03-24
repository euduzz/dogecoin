require('dotenv').config()
const axios = require('axios');

class Currency {

  async get() {
    return await axios.get(process.env.API_URL)
  }

}

export default new Currency();