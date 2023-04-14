import { ConversionRateApi, ConversionRateApiInterface } from "./external/conversion-rate-api";
import { CurrencyConverter } from "./currency-converter";
import { Currency } from "./model/currency";
import { Money } from "./model/money";
import { CurrencyIsoCode } from "./external/currency-iso-code";

interface GetRateCall {
  from: CurrencyIsoCode;
  to: CurrencyIsoCode;
}

describe("CurrencyConverter", function() {
  it("is initialized", () => {
    const converter = new CurrencyConverter(new ConversionRateApi());
    expect(converter).toBeTruthy();
  });
  describe("with mocks", function() {
    it("does convert money", () => {
      const conversionRateApi = new ConversionRateApi();
      const converter = new CurrencyConverter(conversionRateApi);

      jest.spyOn(conversionRateApi, "getRate").mockReturnValue(2);

      const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));

      expect(result.currency).toBe(Currency.Euro);
      expect(result.amount).toBe(4);
    });

    it("does call API with correct parameters", () => {
      const conversionRateApi = new ConversionRateApi();
      const converter = new CurrencyConverter(conversionRateApi);

      jest.spyOn(conversionRateApi, "getRate").mockReturnValue(2);

      converter.sum(Currency.Euro, new Money(2, Currency.Dollar));
      expect(conversionRateApi.getRate).toHaveBeenCalledTimes(1);
      expect(conversionRateApi.getRate).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);
    });

    it("does call API only once per rate combination", () => {
      const conversionRateApi = new ConversionRateApi();
      const converter = new CurrencyConverter(conversionRateApi);

      jest.spyOn(conversionRateApi, "getRate").mockReturnValue(2);

      const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(3, Currency.Dollar));
      expect(result.amount).toBe(10);
      expect(conversionRateApi.getRate).toHaveBeenCalledTimes(1);
    });
  });

  class ConversionRateApiFake implements ConversionRateApiInterface {
    getRatesCalls: GetRateCall[] = [];
    private rates = new Map<CurrencyIsoCode, Record<string, number>>();

    getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): number {
      this.getRatesCalls.push({from: source, to: target});
      if (!this.rates.get(source) || !this.rates.get(source)![target]) {
        throw Error("Not defined");
      }
      return this.rates.get(source)![target];
    }

    withRate(from: CurrencyIsoCode, to: CurrencyIsoCode, rate: number): ConversionRateApiFake {
      if (!this.rates.has(from)) {
        this.rates.set(from, {});
      }
      this.rates.get(from)![to] = rate;
      return this;
    }
  }

  describe("with fakes", function() {
    it("should perform a conversion", function() {
      const conversionRateApiFake = new ConversionRateApiFake()
        .withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 2);
      const converter = new CurrencyConverter(conversionRateApiFake);

      const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));

      expect(result.amount).toBe(4);
      expect(result.currency).toBe(Currency.Euro);
    });

    it("should perform a conversion with multiple currencies", function() {
      const conversionRateApiFake = new ConversionRateApiFake()
        .withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 1.5)
        .withRate(CurrencyIsoCode.JPY, CurrencyIsoCode.EUR, 0.01);

      const converter = new CurrencyConverter(conversionRateApiFake);

      const result = converter.sum(Currency.Euro,
        new Money(2, Currency.Dollar),
        new Money(200, Currency.Yen));

      expect(result.amount).toBe(5);
      expect(result.currency).toBe(Currency.Euro);
    });

    it("should not call twice the API if conversion is the same", function() {
      const conversionRateApiFake = new ConversionRateApiFake()
        .withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 1.5);

      const converter = new CurrencyConverter(conversionRateApiFake);
      jest.spyOn(conversionRateApiFake, 'getRate');

      const result = converter.sum(Currency.Euro,
        new Money(2, Currency.Dollar),
        new Money(200, Currency.Dollar));

      expect(result.amount).toBe(303);
      expect(result.currency).toBe(Currency.Euro);

      expect(conversionRateApiFake.getRate).toHaveBeenCalledTimes(1);
      expect(conversionRateApiFake.getRate).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);
    });

    it("should not call twice the API if conversion is the same (full fake)", function() {
      const conversionRateApiFake = new ConversionRateApiFake()
        .withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, 1.5);

      const converter = new CurrencyConverter(conversionRateApiFake);

      const result = converter.sum(Currency.Euro,
        new Money(2, Currency.Dollar),
        new Money(200, Currency.Dollar));

      expect(result.amount).toBe(303);
      expect(result.currency).toBe(Currency.Euro);

      expect(conversionRateApiFake.getRatesCalls).toHaveLength(1);
      expect(conversionRateApiFake.getRatesCalls[0]).toEqual({from: CurrencyIsoCode.USD, to: CurrencyIsoCode.EUR});
    });
  });
});
