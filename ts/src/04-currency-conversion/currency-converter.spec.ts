import { ConversionRateApi } from "./external/conversion-rate-api";
import { CurrencyConverter } from "./currency-converter";
import { Currency } from "./model/currency";
import { Money } from "./model/money";
import { CurrencyIsoCode } from "./external/currency-iso-code";

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


});
