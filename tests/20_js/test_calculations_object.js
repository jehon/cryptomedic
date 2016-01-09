"use strict";


describe("calculations.object.js", function() {
  it("test field() methods", function() {
    var obj = {
      a: 1,
      b: null
    };
    expect(calculations.file(obj).field('a').isSet(), true);
    expect(calculations.file(obj).field('b').isSet(), true);
    expect(calculations.file(obj).field('c').isSet(), false);

    expect(calculations.file(obj).field('a').isNotZero(), true);
    expect(calculations.file(obj).field('b').isNotZero(), false);
    expect(calculations.file(obj).field('c').isNotZero(), false);
  });

  it("test locked", function() {
    // no update?
    expect(calculations.file({}).isLocked(), false);
    // Very old file
    expect(calculations.file({ update_at: "2001-01" }).isLocked({}), true);
    // This year, but in december
    expect(calculations.file({ update_at: (new Date()).getFullYear() + "-12" }).isLocked({}), true);
  });
});
