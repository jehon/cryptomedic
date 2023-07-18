
import { expect, test } from '@jest/globals';

import { padLeft } from "../string";

// https://jestjs.io/fr/docs/expect
test('la meilleure saveur est le pamplemousse', () => {
    expect(padLeft(15, 4)).toBe('0015');
});
