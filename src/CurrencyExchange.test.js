import CurrencyExchange from './CurrencyExchange';

test('CurrencyExchange powinien być klasą', () => {
  expect(CurrencyExchange.toString()).toMatch(/class/);
});

describe('constructor', () => {
  test('rzuca wyjątek jeśli nie zapodano mu tablicy z danymi', () => {
    expect(() => {
      new CurrencyExchange();
    }).toThrow();
    expect(() => {
      new CurrencyExchange(null);
    }).toThrow();
    expect(() => {
      new CurrencyExchange({});
    }).toThrow();
  });

  test('rzuca wyjątek jeśli zapodano mu pustą tablicę', () => {
    expect(() => {
      new CurrencyExchange([]);
    }).toThrow();
  });

  test('rzuca wyjątek jeśli waluta nie nieprawidłowy kod', () => {
    expect(() => {
      new CurrencyExchange([
        { code: null, buy: 3, sell: 4 },
      ]);
    }).toThrow();
  });

  test('rzuca wyjątek jeśli kurs nie jest dodatni', () => {
    expect(() => {
      new CurrencyExchange([
        { code: 'USD', buy: 3, sell: 0 }
      ]);
    }).toThrow();
    expect(() => {
      new CurrencyExchange([
        { code: 'USD', buy: -1, sell: 4 }
      ]);
    }).toThrow();
    expect(() => {
      new CurrencyExchange([
        { code: 'USD', buy: null, sell: 4 }
      ]);
    }).toThrow();
  });

  test('rzuca wyjątek jeśli kurs kupna jest większy niż kurs sprzedaży', () => {
    expect(() => {
      new CurrencyExchange([
        { code: 'USD', buy: 3, sell: 2 }
      ]);
    }).toThrow();
  });

  test('rzuca wyjątek jeśli kwota prowizji nie jest dodatnia', () => {
    expect(() => {
      new CurrencyExchange([
        { code: 'USD', buy: 3, sell: 4 },
      ], { buyFee: -1, sellFee: 2 });
    }).toThrow();
    expect(() => {
      new CurrencyExchange([
        { code: 'USD', buy: 3, sell: 4 },
      ], { buyFee: 1, sellFee: -2 });
    }).toThrow();
  });

  test('jeśli wartości prowizji nie zostały podane, są one zerowe 0.01', () => {
    const exchanger = new CurrencyExchange([
      { code: 'USD', buy: 3, sell: 4 }
    ], {});
    expect(exchanger.buyFee).toBeCloseTo(0.01, 2);
    expect(exchanger.sellFee).toBeCloseTo(0.01, 2);
  });
});

test('ma metodę getCurrencyNames', () => {
  const exchanger = new CurrencyExchange([
    { code: 'EUR', buy: 4, sell: 5 }
  ]);
  expect(typeof exchanger.getCurrencyNames).toBe('function');
});

test('getCurrencyNames zwraca listę kodów walut zapodanych w konstruktorze', () => {
  const exchanger = new CurrencyExchange([
    { code: 'USD', buy: 3, sell: 4 },
    { code: 'EUR', buy: 4, sell: 5 }
  ]);
  expect(exchanger.getCurrencyNames()).toEqual(['USD', 'EUR']);
});
