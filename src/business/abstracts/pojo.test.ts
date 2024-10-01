import assert from "assert";
import test from "node:test";
import Pojo from "./pojo";

test("with empty loader", function () {
  const data = Pojo.factory({});
  assert(data instanceof Pojo);
});

test("with data loading at construction time", function () {
  const data = Pojo.factory({
    id: "123",
    created_at: new Date(),
    updated_at: new Date(),
    last_user: "data1"
  });

  assert.equal(data.id, "123");

  data.id = "123";
  assert.equal(data.uid(), "pojo.123");
});

test("would interpret notSet correctly", function () {
  const data = Pojo.factory({});
  assert.equal(data.last_user, "");

  data.last_user = "someone";
  assert.equal(data.last_user, "someone");
});
