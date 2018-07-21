export default class CurrencyExchange {
  constructor(exchangeRates, options) {
    if (!Array.isArray(exchangeRates) || exchangeRates.length === 0) {
      throw new Error('Invalid exchange rates');
    }
    const { names, rates } = exchangeRates.reduce((accum, { code, buy, sell }) => {
      if (!code || buy <= 0 || sell <= 0 || buy > sell) {
        throw new Error('Invalid currency data');
      }
      accum.names.push(code);
      accum.rates[code] = { buy, sell };
      return accum;
    }, { names: [], rates: {} });
    this.names = names;
    this.rates = rates;

    const { buyFee, sellFee } = Object.assign({ buyFee: 0.01, sellFee: 0.01 }, options);
    if (buyFee < 0.01 || sellFee < 0.01) {
      throw new Error('Invalid service fees');
    }
    this.buyFee = buyFee;
    this.sellFee = sellFee;
  }

  getCurrencyNames() {
    return this.names;
  }

  getExchangeRate(name) {
    // Object.assign({}, this.rates[name]) || null;  <--- Q: dlaczego nie to ?
    return this.rates.hasOwnProperty(name)
      ? Object.assign({}, this.rates[name])
      : null;
  }

  buy(currency, amount) {
    const amountNum = Number(amount);
    if (!this.rates[currency] || isNaN(amountNum) || amountNum <= 0) {
      throw new Error('Invalid currency or amount');
    }
    return this.rates[currency].buy * amount + this.buyFee;
  }

  sell(currency, amount) {
    const amountNum = Number(amount);
    if (!this.rates[currency] || isNaN(amountNum) || amountNum <= 0) {
      throw new Error('Invalid currency or amount');
    }
    return this.rates[currency].sell * amount - this.sellFee;
  }
}