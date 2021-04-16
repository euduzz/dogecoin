'use strict';
import Twitter from './twitter';
const twitter = new Twitter();

import Currency from './currency';
const currency = new Currency();

class Bot {
  constructor() {}

  async init() {
    const doc = await new currency.get()
    let response = doc.data.data

    this.calculate(response)
  }

  async calculate(response) {
    const dogePrice = response.market_data.price_usd.toFixed(2)
    const dogeVariation = parseFloat(response.market_data.percent_change_usd_last_24_hours).toFixed(2)

    this.publish(dogePrice, dogeVariation)
  }

  async publish(price, variation) {
    let template = ''
    const priceIcon = '💸'
    const variationIcon = {
      up: '🚀',
      down: '🔻'
    }

    if (variation.startsWith('-')) {
      template = `O #dogecoin caiu :( \n\n ${priceIcon} Preço atual: $${price} \n${variationIcon.down} Variação: ${variation}%`
    } else {
      template = `O #dogecoin subiu :) \n\n ${priceIcon} Preço atual: $${price} \n${variationIcon.up}  Variação: +${variation}%`
    }

    new twitter.post(template)
  }
}

export default Bot;