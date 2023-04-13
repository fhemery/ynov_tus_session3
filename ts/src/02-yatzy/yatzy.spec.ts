import Yatzy from "./yatzy";

describe("Yatzee", function() {
  describe("twos", function() {
    it("should add only the twos to the score", function() {
      expect(Yatzy.twos(2, 3, 4, 2, 1)).toBe(4);
    });
  });

  describe("fours", function() {
    let yatze: Yatzy;
    beforeEach(() => {
      yatze = new Yatzy(1, 4, 4, 2,3);
    })
    it("should add only the fours to the score", function() {
      expect(yatze.fours()).toBe(8)
    });
  });
});

//  npm test -- --watchAll