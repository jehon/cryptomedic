
import { fn } from './athelpers.js';
import XPatientByReference from '../../app/elements/pages/home/x-patient-by-reference.js';

xdescribe(fn(import.meta.url), function () {
    it('should work', function () {
        new XPatientByReference();
        expect(true).toBeTrue();

    });
});
