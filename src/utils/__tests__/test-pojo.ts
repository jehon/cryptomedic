
import { expect, test } from '@jest/globals';

import Pojo from "../pojo";

// https://jestjs.io/fr/docs/expect
test('padLeftTrim', () => {
    const p = new Pojo();

    expect(p.id).toBe(0);
    expect(p.model).toBe('Pojo');
    expect(p.uid).toBe('pojo-0');
});
