import test from "node:test";

import assert from "node:assert";
import Price from "./price";

test("with empty loader", function () {
  const data = new Price();
  assert(data instanceof Price);
});

test("with data loading at construction time", function () {
  const data = Price.factory({
    id: 123
  });

  assert.equal(data.id, 123);
});
