import assert from "assert";
import test from "node:test";
import { yearOfBirthPattern } from "./patient";

test("year of birth pattern", () => {
  const yofRegex = new RegExp("^" + yearOfBirthPattern + "$", "mv");
  // Normal cases
  assert.ok(yofRegex.test("1999"));
  assert.ok(yofRegex.test("1999-1"));
  assert.ok(yofRegex.test("1999-01"));
  assert.ok(yofRegex.test("2010"));
  assert.ok(yofRegex.test("2024-01"));

  // KO
  assert.ok(!yofRegex.test("1969"));
  assert.ok(!yofRegex.test("2030"));

  assert.ok(!yofRegex.test("2000-13"));
  assert.ok(!yofRegex.test("2000-25"));

  assert.ok(!yofRegex.test("19999"));
  assert.ok(!yofRegex.test("19999-01"));
});
