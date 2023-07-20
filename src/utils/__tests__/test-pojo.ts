
import { expect, test } from '@jest/globals';

import Pojo from "../pojo";

// https://jestjs.io/fr/docs/expect
test('empty', () => {
    const p = new Pojo();

    expect(p.id).toBe(0);
    expect(p.model).toBe('Pojo');
    expect(p.uid).toBe('pojo-0');
});

test('with data', () => {
    const p = new Pojo(12);

    expect(p.id).toBe(12);
    expect(p.model).toBe('Pojo');
    expect(p.uid).toBe('pojo-12');
});
