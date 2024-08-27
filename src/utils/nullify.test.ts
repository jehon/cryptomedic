import { expect } from "expect";
import test from "node:test";

import nullify from "./nullify";

test("should nullify string", () => {
  expect(nullify("")).toEqual("");
});

test("should nullify string null", () => {
  expect(nullify("null")).toEqual(null);
});

test("should nullify string ?", () => {
  expect(nullify("?")).toEqual(null);
});

test("should nullify string undefined", () => {
  expect(nullify("undefined")).toEqual(null);
});

test("should nullify string anything", () => {
  expect(nullify("anything")).toEqual("anything");
});

test("should nullify int 123", () => {
  expect(nullify(123)).toEqual(123);
});

test("should nullify object", () => {
  expect(
    nullify({
      a: 1,
      b: "null",
      c: null
    })
  ).toEqual({
    a: 1,
    b: null,
    c: null
  });
});

test("should handle null", () => {
  expect(nullify(null)).toBe(null);
});

test('should handle "null"', () => {
  expect(nullify("null")).toBe(null);
});

test('should handle "?"', () => {
  expect(nullify("?")).toBe(null);
});

test("should handle numbers", () => {
  expect(nullify(123)).toBe(123);
});

test("should handle strings", () => {
  expect(nullify("hehehe")).toBe("hehehe");
});

test("should handle false", () => {
  expect(nullify(false)).toBe(false);
});

test("should handle true", () => {
  expect(nullify(true)).toBe(true);
});

test("should handle object", () => {
  expect(
    nullify({
      a: 123,
      b: null,
      c: "null",
      d: 456,
      e: "?",
      f: {
        g: "null"
      }
    })
  ).toEqual({
    a: 123,
    b: null,
    c: null,
    d: 456,
    e: null,
    f: {
      g: null
    }
  });
});
