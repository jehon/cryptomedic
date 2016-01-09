"use strict";


describe("calculations.consultation.js", function() {
  it("test field() methods", function() {
    var obj = {
      a: 1,
      b: null
    };
    expect(calculations.consultation(obj, {}).field('a').isSet(), true);
    expect(calculations.consultation(obj, {}).field('a').isNotZero(), true);
  });

  it("test locked", function() {
    // no update?
    expect(calculations.consultation({}, {}).isLocked(), false);
  });
});
