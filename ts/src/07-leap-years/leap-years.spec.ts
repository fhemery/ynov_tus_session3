function isLeapYear(year: number) {
  if (isDividableBy(year, 400)) return true;
  if (isDividableBy(year, 100)) return false;
  return isDividableBy(year, 4);
}

function isDividableBy(year: number, howMany: number): boolean {
  return year % howMany === 0;
}

describe("Leap years", function() {
  it("should return true if year is dividable by 400", function() {
    expect(isLeapYear(2000)).toBe(true);
  });

  it("should return false if year is dividable by 100 but not by 400", function() {
    expect(isLeapYear(2100)).toBe(false);
  });

  it("should return true if year is dividable by 4 but not by 400", function() {
    expect(isLeapYear(2004)).toBe(true);
  });

  it("should return false if year is not dividable by 4", function() {
    expect(isLeapYear(2003)).toBe(false);
  });
});