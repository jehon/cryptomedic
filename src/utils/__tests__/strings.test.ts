import { expect, test } from '@jest/globals';

import { padLeftTrim, toAttributeCase, toTitleCase } from "../strings";

// https://jestjs.io/fr/docs/expect
test('padLeftTrim', () => {
    expect(padLeftTrim(15, 4)).toBe('0015');
    expect(padLeftTrim(15, 2)).toBe('15');
    expect(padLeftTrim(15, 1)).toBe('5');
});

test("should toAttributeCase case (kebab case)", function () {
  expect(toAttributeCase("abcDefGhi")).toBe("abc-def-ghi");
});

test("should title case", function () {
  expect(toTitleCase("abc def")).toBe("Abc Def");
});
