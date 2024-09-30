import test from "node:test";

import assert from "node:assert";
import nullify from "./nullify";

test("should nullify string", () => {
  assert.equal(nullify(""), "");
});

test("should nullify string null", () => {
  assert.equal(nullify("null"), null);
});

test("should nullify string ?", () => {
  assert.equal(nullify("?"), null);
});

test("should nullify string undefined", () => {
  assert.equal(nullify("undefined"), null);
});

test("should nullify string anything", () => {
  assert.equal(nullify("anything"), "anything");
});

test("should nullify int 123", () => {
  assert.equal(nullify(123), 123);
});

test("should nullify object", () => {
  assert.deepStrictEqual(
    nullify({
      a: 1,
      b: "null",
      c: null
    }),
    {
      a: 1,
      b: null,
      c: null
    }
  );
});

test("should handle null", () => {
  assert.equal(nullify(null), null);
});

test('should handle "null"', () => {
  assert.equal(nullify("null"), null);
});

test('should handle "?"', () => {
  assert.equal(nullify("?"), null);
});

test("should handle numbers", () => {
  assert.equal(nullify(123), 123);
});

test("should handle strings", () => {
  assert.equal(nullify("hehehe"), "hehehe");
});

test("should handle false", () => {
  assert.equal(nullify(false), false);
});

test("should handle true", () => {
  assert.equal(nullify(true), true);
});

test("should handle object", () => {
  assert.deepStrictEqual(
    nullify({
      a: 123,
      b: null,
      c: "null",
      d: 456,
      e: "?",
      f: {
        g: "null"
      }
    }),
    {
      a: 123,
      b: null,
      c: null,
      d: 456,
      e: null,
      f: {
        g: null
      }
    }
  );
});
