import assert from "node:assert";
import test from "node:test";
import { routeParent } from "./routing";

test("routeParent", () => {
  assert.equal(routeParent("/"), "/");
  assert.equal(routeParent("/bla"), "/");
  assert.equal(routeParent("/bla/bli"), "/bla");

  assert.equal(routeParent("/", 2), "/");
  assert.equal(routeParent("/bla", 2), "/");
  assert.equal(routeParent("/bla/bli", 2), "/");
  assert.equal(routeParent("/bla/bli/blu", 2), "/bla");
});
