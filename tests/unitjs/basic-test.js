
import { fn, loadReference, extractPath } from './athelpers.js';

describe(fn(import.meta.url), function () {
    it('should be true', () => {
        expect(true).toBeTruthy();
    });

    it('should athelpers.js', () => {
        expect(loadReference).not.toBeNull();
    });

    it('should load references', async () => {
        const ref = loadReference('FolderTest.test1.json');
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
