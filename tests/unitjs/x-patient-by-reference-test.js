
import { fn } from './athelpers.js';
import XPatientByReference from '../../app/elements/components/x-patient-by-reference.js';
import { mockResponseWithSuccess } from './x-requestor-test.js';
import { getCurrentRoute, getRouteToFolderPatient } from '../../app/js/router.js';

describe(fn(import.meta.url), function () {
    let element;
    beforeEach(() => {
        element = new XPatientByReference();
    });

    it('should redirect when found', async function () {
        expect(true).toBeTrue();
        mockResponseWithSuccess({ id: 123 });

        element.shadowRoot.querySelector('[name=entryyear]').value = '2000';
        element.shadowRoot.querySelector('[name=entryorder]').value = '4444';
        await element.searchReference();
        expect(element.getAttribute('status')).toBe('found');
        expect(getCurrentRoute()).toBe(getRouteToFolderPatient(123));
    });

    it('should propose the creation when not found', async function () {
        expect(true).toBeTrue();
        mockResponseWithSuccess({});

        element.shadowRoot.querySelector('[name=entryyear]').value = '2000';
        element.shadowRoot.querySelector('[name=entryorder]').value = '4444';
        await element.searchReference();
        expect(element.getAttribute('status')).toBe('creation-proposed');

        mockResponseWithSuccess({ id: 456 });
        await element.createReference();
        expect(element.getAttribute('status')).toBe('creation-requested');
        expect(getCurrentRoute()).toBe(getRouteToFolderPatient(456, true));
    });
});
