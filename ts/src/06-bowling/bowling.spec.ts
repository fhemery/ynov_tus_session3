import { BowlingKata } from "./bowling-kata";

describe("Bowling kata", function() {
  let kata: BowlingKata;

  beforeEach(() => {
    kata = new BowlingKata();
  });

  it("should return 0 when no pin has been touched at all", function() {
    expect(kata.getScore("-- -- -- -- -- -- -- -- -- --")).toBe(0);
  });

  it("should return the number of pins when they have been touched", function() {
    expect(kata.getScore("1- -- -- -- -- -- -- -- -- --")).toBe(1);
  });

  it("should add the number of pins of the frame", function() {
    expect(kata.getScore("12 -- -- -- -- -- -- -- -- --")).toBe(3);
  });

  it("should count 10 for a spare for the frame", function() {
    expect(kata.getScore("1/ -- -- -- -- -- -- -- -- --")).toBe(10);
  });

  it("should add the next throw after a spare frame", function() {
    expect(kata.getScore("1/ 3- -- -- -- -- -- -- -- --")).toBe(16);
  });

  it("should count 10 for a strike", function() {
    expect(kata.getScore("X -- -- -- -- -- -- -- -- --")).toBe(10);
  });

  it("should add the next two throws for a strike frame", function() {
    expect(kata.getScore("X 12 -- -- -- -- -- -- -- --")).toBe(16);
  });

  it("should add the next two throws for a strike frame", function() {
    expect(kata.getScore("X 1/ -- -- -- -- -- -- -- --")).toBe(20 + 10);
  });
});