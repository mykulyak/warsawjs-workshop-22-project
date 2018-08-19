import { titleCase } from './utils';

const API_URL = `http://api.nbp.pl/api/exchangerates/tables/C/?format=json`;

export default class Backend {
  constructor() {
    this.date = null;
    this.rates = null;
    this.currencies = null;
    this.stats = {};
  }

  _fetchData() {
    return global.fetch(API_URL).then(res => res.json().then(data => {
      this.date = data[0].tradingDate;
      this.rates = data[0].rates.map(({ code, bid, ask}) => ({
        code,
        buy: ask,
        sell: bid
      }));
      this.currencies = data[0].rates.map(({ currency, code }) => ({
        code,
        name: titleCase(currency),
      }));
    }));
  }

  currencies() {
    return this._fetchData().then(() => this.currencies);
  }

  exchangeRates() {
    return this._fetchData().then(() => this.rates);
  }

  reset() {
    this.date = null;
    this.rates = null;
    this.currencies = null;
    this.stats = {};
  }

  operation({ operation, buyCurrency, sellCurrency, amount }) {
    global.console.warn('Backend', { operation, buyCurrency, sellCurrency, amount });
    return new Promise((resolve, reject) => {
      global.setTimeout(() => {
        const r = Math.random();
        if (r > 0) { // increate to make error happen more often
          resolve({ });
        } else {
          reject(new Error());
        }
      }, 2000);
    });
  }
}
