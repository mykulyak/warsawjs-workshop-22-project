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
}