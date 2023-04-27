import { BasketEstimator, PRICE_PER_BOOK, THREE_BOOKS_DISCOUNT, Tome, TWO_BOOKS_DISCOUNT } from "./potter";

describe("Potter kata", function() {
  let basketEstimator: BasketEstimator;

  beforeEach(() => {
    basketEstimator = new BasketEstimator();
  })

  it("should return 0 for an empty basket", function() {
    expect(basketEstimator.getPrice([])).toBe(0);
  });

  it("should return 8 euros for one Tome", function() {
    expect(basketEstimator.getPrice([Tome.First])).toBe(PRICE_PER_BOOK);
  });

  it("should return 8 euros per identical Tome", function() {
    expect(basketEstimator.getPrice([Tome.First, Tome.First])).toBe(PRICE_PER_BOOK*2);
  });

  it("should apply 5% discount for two different tomes", function() {
    expect(basketEstimator.getPrice([Tome.First, Tome.Second])).toBe(PRICE_PER_BOOK*2*TWO_BOOKS_DISCOUNT);
  });

  it("should apply 10% discount for three different tomes", function() {
    expect(basketEstimator.getPrice([Tome.First, Tome.Second, Tome.Third])).toBe(PRICE_PER_BOOK*3*THREE_BOOKS_DISCOUNT);
  });

  xit("should not apply discount for identical tomes", function() {
    expect(basketEstimator.getPrice([Tome.First, Tome.Second, Tome.Second])).toBe(2*PRICE_PER_BOOK*TWO_BOOKS_DISCOUNT + PRICE_PER_BOOK);
  });
});

/*
 let basePrice = books.length * PRICE_PER_BOOK;
    const booksByTome = ;

    let orderedTomes = booksByTome.sort().reverse();

    let price = 0;
    while(orderedTomes[0] > 0) {
      const remainingTomes = orderedTomes.filter(t => t > 0).length;
      price += remainingTomes * PRICE_PER_BOOK * discount[remainingTomes];
      orderedTomes = orderedTomes.map(i => i-1);
    }
    return price;
 */