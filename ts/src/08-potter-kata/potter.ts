export enum Tome {
  First,
  Second,
  Third,
  Fourth,
  Fifth
}

export const PRICE_PER_BOOK = 8;
export const TWO_BOOKS_DISCOUNT = 0.95;
export const THREE_BOOKS_DISCOUNT = 0.90;
const discount = [0, 1, TWO_BOOKS_DISCOUNT, THREE_BOOKS_DISCOUNT];

export class BasketEstimator {

  getPrice(books: Tome[]): number {
    const booksByTome = this.splitByTome(books).sort().reverse();
    const piles = [];

    for (let i = 0; i < booksByTome[0]; ++i) {
      piles.push(1);
    }

    for (let tome = 1; tome < booksByTome.length; ++tome) {
      for (let i = 0; i < booksByTome[tome]; ++i) {
        piles[i]++;
      }
    }

    return piles.reduce((alreadyProcessedPrice: number, booksInCurrentPile: number) => alreadyProcessedPrice + booksInCurrentPile * PRICE_PER_BOOK * discount[booksInCurrentPile], 0);
  }
  private splitByTome(books: Tome[]): number[] {
    return books
      .reduce((handledTomes, tome) => {
        handledTomes[tome] += 1;
        return handledTomes;
      }, [0, 0, 0, 0, 0]);
  }
}