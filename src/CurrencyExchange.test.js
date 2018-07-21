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

describe('getExchangeRate', () => {
  let exchanger;

  beforeEach(() => {
    exchanger = new CurrencyExchange([
      { code: 'USD', buy: 3, sell: 4 },
      { code: 'EUR', buy: 4, sell: 5 }
    ]);
  });

  afterEach(() => {
    exchanger = null;
  });

  test('powinna być funkcją', () => {
    expect(typeof exchanger.getExchangeRate).toBe('function');
  });

  test('powinna zwracać kursy wymiany dla zadanej waluty', () => {
    expect(exchanger.getExchangeRate('USD')).toEqual({
      buy: 3, sell: 4
    });
  });

  test('powinna zwracać null jeśli takiej waluty nie ma', () => {
    expect(exchanger.getExchangeRate('XYZ')).toBeNull();
  });

  test('zmiany w zwróconych obiektach nie powinny wpływać na własne dane', () => {
    const rate1 = exchanger.getExchangeRate('USD');
    expect(rate1).toEqual({ buy: 3, sell: 4 });
    rate1.buy = 10;

    expect(exchanger.getExchangeRate('USD')).toEqual({ buy: 3, sell: 4 });
  });
});

describe('buy', () => {
  let exchanger;

  beforeEach(() => {
    exchanger = new CurrencyExchange([
      { code: 'USD', buy: 3, sell: 4 },
      { code: 'EUR', buy: 4, sell: 5 },
      { code: 'GBP', buy: 8, sell: 10 }
    ]);
  });

  afterEach(() => {
    exchanger = null;
  });
  
  test('jest funkcją', () => {
    expect(typeof exchanger.buy).toBe('function');
  });

  test.each([
    [undefined, undefined],
    [-100, undefined],
    ['EUR', undefined],
    ['EUR', -100]
  ])('rzuca wyjątek jeśli zapodano nieprawidłową nazwę waluty lub kwotę (%p %p)', (...args) => {
    expect(() => {
      exchanger.buy(...args);
    }).toThrow();
  });

  test('zwraca kwotę do zapłacenia dla zadanego zestawu parametrów', () => {
    expect(exchanger.buy('EUR', 10)).toBeCloseTo(40.01, 2);
    expect(exchanger.buy('USD', 100)).toBeCloseTo(300.01, 2);
  });

  test('kwota do zapłacenia równa się prowizja + kwota * kurs', () => {
    const anotherExchange = new CurrencyExchange([
      { code: 'USD', buy: 3, sell: 4 },
    ], { buyFee: 10, sellFee: 20 });
    expect(anotherExchange.buy('USD', 100)).toBeCloseTo(310, 2);
  });
});

describe('sell', () => {
  let exchanger;

  beforeEach(() => {
    exchanger = new CurrencyExchange([
      { code: 'USD', buy: 3, sell: 4 },
      { code: 'EUR', buy: 4, sell: 5 },
      { code: 'GBP', buy: 8, sell: 10 }
    ]);
  });

  afterEach(() => {
    exchanger = null;
  });
  
  test('jest funkcją', () => {
    expect(typeof exchanger.sell).toBe('function');
  });

  test.each([
    [undefined, undefined],
    [-100, undefined],
    ['EUR', undefined],
    ['EUR', -100]
  ])('rzuca wyjątek jeśli zapodano nieprawidłową nazwę waluty lub kwotę (%p %p)', (...args) => {
    expect(() => {
      exchanger.sell(...args);
    }).toThrow();
  });

  test('zwraca kwotę do zapłacenia dla zadanego zestawu parametrów', () => {
    expect(exchanger.sell('EUR', 10)).toBeCloseTo(49.99, 2);
    expect(exchanger.sell('USD', 100)).toBeCloseTo(399.99, 2);
  });

  test('kwota do zapłacenia równa się kwota * kurs - prowizja', () => {
    const anotherExchange = new CurrencyExchange([
      { code: 'USD', buy: 3, sell: 4 },
    ], { buyFee: 10, sellFee: 20 });
    expect(anotherExchange.sell('USD', 100)).toBeCloseTo(380, 2);
  });
});
