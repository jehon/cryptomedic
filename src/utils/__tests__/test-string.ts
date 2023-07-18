
import { expect, test } from '@jest/globals';

import { padLeftTrim } from "../string";

// https://jestjs.io/fr/docs/expect
test('padLeftTrim', () => {
    expect(padLeftTrim(15, 4)).toBe('0015');
    expect(padLeftTrim(15, 2)).toBe('15');
    expect(padLeftTrim(15, 1)).toBe('5');
});
