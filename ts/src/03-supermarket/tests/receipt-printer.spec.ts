import { Product } from "../src/model/Product";
import { ProductUnit } from "../src/model/ProductUnit";
import { ReceiptPrinter } from "../src/ReceiptPrinter";
import { Receipt } from "../src/model/Receipt";

class Helper {
  text:string[]=[];

  withLine(line: string): Helper {
    this.text.push(line)
    return this;
  }

  build() {
    return this.text.join('\n');
  }
}

describe("Receipt Printer", function() {

  it("should return correct price", function() {
    // ARRANGE
    const apples = new Product("Apples", ProductUnit.Kilo)
    const receipt = new Receipt();
    receipt.addProduct(apples, 2, 5, 10);

    const printer = new ReceiptPrinter();

    // ACT
    const result = printer.printReceipt(receipt);

    // ASSERT
    //expect(result).toMatchSnapshot();
    const expected = new Helper().withLine('Apples                             10.00')
      .withLine('  5.00 * 2.000')
      .withLine('')
      .withLine('Total:                             10.00').build();
    expect(result).toBe(expected);
  });
});