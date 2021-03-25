'use strict';
const Twitter = require('./twitter');
const Currency = require('./currency');


const init = () => {
  verify()
}

const verify = async() => {
  let doc = await Currency.get()
  let response = doc.data.data
  calculate(response)
}

const calculate = (response) => {
  var formatedPrice = response.market_data.price_usd.toFixed(5)
  var formatPercent = parseFloat(response.market_data.percent_change_usd_last_1_hour).toFixed(2)+"%"

  let settings = {
    isHigher: null,
    formatedPrice: formatedPrice,
    formatPercent: formatPercent
  }

  if (response.market_data.price_usd > response.market_data.ohlcv_last_1_hour.high) {
    settings.isHigher = true
  } else {
    settings.isHigher = false
  }

  publish(settings)
}

const publish = (settings) => {
  let template = ''
  if (settings.isHigher === null) {
    template = `💸 Dogecoin se manteve: ${settings.formatedPrice} \n📈 Variação: ${settings.formatPercent}`
  }
  if (settings.isHigher) {
    template = `💸 Dogecoin subiu: ${settings.formatedPrice} \n📈 Variação: ${settings.formatPercent}`
  } else if (!settings.isHigher) {
    template = `💸 Dogecoin caiu: ${settings.formatedPrice} \n📈 Variação: ${settings.formatPercent}`
  }
  Twitter.post(template)
}

module.exports = {
  init,
  verify,
  calculate,
  publish,
};