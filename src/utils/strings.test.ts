import assert from "node:assert";
import test from "node:test";
import {
  escapeRegExp,
  padLeftTrim,
  roundTo,
  toAttributeCase,
  toTitleCase,
  yearOfBirthPattern
} from "./strings";

// https://jestjs.io/fr/docs/expect
test("padLeftTrim", () => {
  assert.equal(padLeftTrim(15, 4), "0015");
  assert.equal(padLeftTrim(15, 2), "15");
  assert.equal(padLeftTrim(15, 1), "5");
});

test("toAttributeCase (kebab case)", function () {
  assert.equal(toAttributeCase("abcDefGhi"), "abc-def-ghi");

  assert.equal(toAttributeCase("abc_def_ghi"), "abc-def-ghi");
  assert.equal(toAttributeCase("abc_DEF_ghi"), "abc-DEF-ghi");
});

test("toTitleCase (english case)", function () {
  assert.equal(toTitleCase("abc def"), "Abc Def");
});

test("roundTo", function () {
  assert.equal(roundTo(12.345, 0), "12");
  assert.equal(roundTo(12.345, 1), "12.3");
  assert.equal(roundTo(12.345, 5), "12.34500");
});

test("escapeRegExp", function () {
  assert.equal(
    new RegExp(escapeRegExp("/blabla/something")).test("/blabla/something"),
    true
  );
  assert.equal(
    new RegExp(escapeRegExp("/blabla/something")).test("_blabla_something"),
    false
  );
});

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
