import { expect, test } from '@jest/globals';

import { padLeftTrim, roundTo, toAttributeCase, toTitleCase } from "../strings";

// https://jestjs.io/fr/docs/expect
test('padLeftTrim', () => {
    expect(padLeftTrim(15, 4)).toBe('0015');
    expect(padLeftTrim(15, 2)).toBe('15');
    expect(padLeftTrim(15, 1)).toBe('5');
});

test("toAttributeCase (kebab case)", function () {
  expect(toAttributeCase("abcDefGhi")).toBe("abc-def-ghi");
});

test("toTitleCase (english case)", function () {
  expect(toTitleCase("abc def")).toBe("Abc Def");
});

test("roundTo", function() {
  expect(roundTo(12.345, 0)).toBe("12");
  expect(roundTo(12.345, 1)).toBe("12.3");
  expect(roundTo(12.345, 5)).toBe("12.34500");
})