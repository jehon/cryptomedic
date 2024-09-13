import assert from "node:assert";
import test from "node:test";
import {
  escapeRegExp,
  padLeftTrim,
  roundTo,
  toAttributeCase,
  toTitleCase
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
