import { expect, test } from '@jest/globals';

import { padLeftTrim, toAttributeCase, toPropertyCase } from "../strings";

// https://jestjs.io/fr/docs/expect
test('padLeftTrim', () => {
    expect(padLeftTrim(15, 4)).toBe('0015');
    expect(padLeftTrim(15, 2)).toBe('15');
    expect(padLeftTrim(15, 1)).toBe('5');
});

test("should toPropertyCase case (camel case)", function () {
  expect(toPropertyCase("abc def")).toBe("abcDef");
  expect(toPropertyCase("abc-def")).toBe("abcDef");
  expect(toPropertyCase("abc_def")).toBe("abcDef");
  expect(toPropertyCase("abc def ghi klm")).toBe("abcDefGhiKlm");
  expect(toPropertyCase("abc-def-ghi-klm")).toBe("abcDefGhiKlm");
  expect(toPropertyCase("abc_def_ghi_klm")).toBe("abcDefGhiKlm");
  expect(toPropertyCase("abc def-ghi_klm")).toBe("abcDefGhiKlm");
  expect(toPropertyCase("abc def-ghi_klm", false)).toBe("abcDefGhiKlm");
  expect(toPropertyCase("abc def-ghi_klm", true)).toBe("AbcDefGhiKlm");
});

test("should toAttributeCase case (kebab case)", function () {
  expect(toAttributeCase("abcDefGhi")).toBe("abc-def-ghi");
});
