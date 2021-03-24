const Twitter = require('./tools/twitter');
const Currency = require('./tools/currency');

module.exports = class Bot {

  init() {
    this.verify()
  }

  async verify() {
    let doc = await Currency.get()
    let response = doc.data.data
    this.calculate(response)
  }

  calculate(response) {
    var formatedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(response.market_data.price_usd)

    var formatPercent = parseFloat(response.market_data.percent_change_usd_last_1_hour).toFixed(2)+"%"

    var date = new Date();
    var options = { hour: 'numeric', minute: '2-digit' };
    var localHour = date.toLocaleString('pt-BR', options)

    let settings = {
      isHigher: false,
      localHour: localHour,
      formatedPrice: formatedPrice,
      formatPercent: formatPercent
    }

    if (response.market_data.price_usd > response.market_data.ohlcv_last_1_hour.open) {
      settings.isHigher = true
    } else if (response.market_data.price_usd < response.market_data.ohlcv_last_1_hour.open) {
      settings.isHigher = false
    }

    this.publish(settings)
  }

  publish(settings) {
    let template = ''
    if (settings.isHigher === true) {
      template = `💸 Dogecoin subiu - ${settings.formatedPrice} às ${settings.localHour} \n📈 Variação: ${settings.formatPercent}`
    } else {
      template = `💸 Dogecoin caiu - ${settings.formatedPrice} às ${settings.localHour} \n📈 Variação: ${settings.formatPercent}`
    }
    Twitter.post(template)
  }

}