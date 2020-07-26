
import { fn, loadReference, extractPath, RefFolder1 } from './athelpers.js';

describe(fn(import.meta.url), function () {
    it('should be true', () => {
        expect(true).toBeTruthy();
    });

    it('should athelpers.js', () => {
        expect(loadReference).not.toBeNull();
    });

    it('should load references', async () => {
        const ref = loadReference(RefFolder1);
        expect(ref).not.toBeUndefined();
        expect(ref.folder).not.toBeUndefined();
    });

    it('with extractPath', function () {
        expect(extractPath('http://localhost:9876/test')).toBe('/test');
        expect(extractPath('https://localhost:9876/test')).toBe('/test');

        // invalid
        expect(extractPath('xhttp://localhost:9876/test')).toBe('xhttp://localhost:9876/test');
    });
});
