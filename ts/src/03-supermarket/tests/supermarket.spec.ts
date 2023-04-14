import { Teller } from "../src/model/Teller";
import { FakeCatalog } from "./FakeCatalog";
import { ShoppingCart } from "../src/model/ShoppingCart";
import { Product } from "../src/model/Product";
import { ProductUnit } from "../src/model/ProductUnit";

describe("Supermarke - Teller", function() {

  let teller: Teller;

  it("should return nothing on empty basket", function() {
    // ARRANGE
    teller = new Teller(new FakeCatalog());
    const shoppingCart = new ShoppingCart();
    
    // ACT
    const receipt = teller.checksOutArticlesFrom(shoppingCart);

    // ASSERT
    expect(receipt.getItems()).toHaveLength(0);
    expect(receipt.getDiscounts()).toHaveLength(0);

    expect(receipt).toMatchSnapshot();
  });

  it('should return one item and no discount', () => {
    // ARRANGE
    const catalog = new FakeCatalog();

    const apples = new Product("Apples", ProductUnit.Kilo)
    catalog.addProduct(apples, 5);

    const shoppingCart = new ShoppingCart();
    shoppingCart.addItemQuantity(apples, 2);

    teller = new Teller(catalog);
    // ACT
    const receipt = teller.checksOutArticlesFrom(shoppingCart);

    // ASSERT
    /*expect(receipt.getItems()).toHaveLength(1);
    expect(receipt.getItems()[0].product.name).toBe("Apples");
    expect(receipt.getItems()[0].totalPrice).toBe(10);
    expect(receipt.getTotalPrice()).toBe(10);*/

    expect(receipt).toMatchSnapshot();
  })
});