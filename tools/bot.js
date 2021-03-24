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
  var formatedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(response.market_data.price_usd)

  var formatPercent = parseFloat(response.market_data.percent_change_usd_last_1_hour).toFixed(2)+"%"

  let settings = {
    isHigher: false,
    formatedPrice: formatedPrice,
    formatPercent: formatPercent
  }

  if (response.market_data.price_usd > response.market_data.ohlcv_last_1_hour.open) {
    settings.isHigher = true
  } else if (response.market_data.price_usd < response.market_data.ohlcv_last_1_hour.open) {
    settings.isHigher = false
  } else {
    settings.isHigher = null
  }

  publish(settings)
}

const publish = (settings) => {
  let template = ''
  if (settings.isHigher) {
    template = `💸 Dogecoin subiu - ${settings.formatedPrice} \n📈 Variação: ${settings.formatPercent}`
  } else if (!settings.isHigher) {
    template = `💸 Dogecoin caiu - ${settings.formatedPrice} \n📈 Variação: ${settings.formatPercent}`
  } else {
    template = `💸 Dogecoin se manteve - ${settings.formatedPrice} \n📈 Variação: ${settings.formatPercent}`
  }
  Twitter.post(template)
}

module.exports = {
  init,
  verify,
  calculate,
  publish,
};