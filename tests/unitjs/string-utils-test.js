
import { fn } from './athelpers.js';
import { toTitleCase, toSentenceCase, toAttributeCase, toPropertyCase, _canonize } from '../../app/js/string-utils.js';

describe(fn(import.meta.url), function () {
    it('should canonize', function () {
        expect(_canonize('abc def ghi')).toEqual(['abc', 'def', 'ghi']);
        expect(_canonize('abc-def-ghi')).toEqual(['abc', 'def', 'ghi']);
        expect(_canonize('abc_def_ghi')).toEqual(['abc', 'def', 'ghi']);
        expect(_canonize('abcDefGhi')).toEqual(['abc', 'def', 'ghi']);
    });

    it('should sentence case', function () {
        expect(toSentenceCase('abc def')).toBe('Abc def');
        expect(toSentenceCase('abc def', false)).toBe('Abc def');
        expect(toSentenceCase('abc def', true)).toBe('abc def');
    });

    it('should title case', function () {
        expect(toTitleCase('abc def')).toBe('Abc Def');
    });

    it('should camel case', function () {
        expect(toPropertyCase('abc def')).toBe('abcDef');
        expect(toPropertyCase('abc-def')).toBe('abcDef');
        expect(toPropertyCase('abc_def')).toBe('abcDef');
        expect(toPropertyCase('abc def ghi klm')).toBe('abcDefGhiKlm');
        expect(toPropertyCase('abc-def-ghi-klm')).toBe('abcDefGhiKlm');
        expect(toPropertyCase('abc_def_ghi_klm')).toBe('abcDefGhiKlm');
        expect(toPropertyCase('abc def-ghi_klm')).toBe('abcDefGhiKlm');
    });

    it('should kebab case', function () {
        expect(toAttributeCase('abcDefGhi')).toBe('abc-def-ghi');
    });

});
