
import { fn, loadReference, RefFolder1 } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFfPatientRelated from '../../app/elements/widgets/x-ff-patient-related.js';

let testFolder;

describe(fn(import.meta.url), function () {
    let el;
    beforeEach(() => {
        testFolder = new Folder(loadReference(RefFolder1).folder);
        el = new XFfPatientRelated();
        el.folder = testFolder;
    });

    it('should show', function () {
        expect(el.hasAttribute('blocked')).toBeFalse();
        expect(el.shadowRoot.querySelector('[field=entryorder]').innerHTML).toBe('2000-1');

        expect(el.shadowRoot.querySelector('[field=Name]').shadowRoot.querySelector('div#content').innerHTML).toBe('rezaul islam');
        expect(el.shadowRoot.querySelector('[field=Sex]').shadowRoot.querySelector('div#content').innerHTML).toBe('Male');
    });
});
