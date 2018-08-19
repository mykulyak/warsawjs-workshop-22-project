import { titleCase } from './utils';
import { OPERATION_TYPE, ALLOWED_OPERATIONS } from './consts';

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
        if (!ALLOWED_OPERATIONS.includes(operation)) {
          reject(new Error());
          return;
        }
        if (operation !== OPERATION_TYPE.SELL) {
          const buyInfo = this.currencies.find(el => el.code === buyCurrency);
          if (!buyInfo) {
            reject(new Error());
            return;
          }
        }
        if (operation !== OPERATION_TYPE.BUY) {
          const sellInfo = this.currencies.find(el => el.code === sellCurrency);
          if (!sellInfo) {
            reject(new Error());
            return;
          }
        }
        const money = Number(amount);
        if (isNaN(money) || money <= 0) {
          reject(new Error());
          return;
        }
        resolve();
      }, 200);
    });
  }
}
