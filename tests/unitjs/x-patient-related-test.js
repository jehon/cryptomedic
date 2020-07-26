
import XPatientRelated from '../../app/elements/widgets/x-patient-related.js';

import { loadReference, RefFolder1 } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import Appointment from '../../app/models/Appointment.js';

describe('tests/unit/x-patient-related-test.js', function () {
    let f;
    beforeEach(() => {
        f = new Folder(loadReference(RefFolder1).folder);
    });

    const na = {
        'id': 999,
        'created_at': '<timestamp>',
        'updated_at': '<timestamp>',
        'lastuser': 'Thierry',
        'patient_id': 1,
        'Date': '2007-01-10',
        'ExaminerName': 'Ershad',
        'purpose': null,
        'Nextappointment': '2999-01-10',
        'NextCenter': null
    };

    describe('with object', function() {
        it('should be initialized', function() {
            const el = new XPatientRelated();
            expect(el.hasAttribute('blocked')).toBeTrue();
        });

        it('should show patient informations', function () {
            const el = new XPatientRelated();
            el.folder = f;
            expect(el.hasAttribute('blocked')).toBeFalse();
            expect(el.querySelector('#Patient_entryyear').innerHTML).toBe('2000');
            expect(el.querySelector('#Patient_entryorder').innerHTML).toBe('1');
            expect(el.querySelector('#Patient_Name').innerHTML).toBe('rezaul islam');

            expect(el.querySelector('#Patient_Yearofbirth').innerHTML).toBe('1998');
            expect(el.querySelector('#Patient_Sex').innerHTML).toBe('Male');
            expect((/** @type {HTMLElement} */ (el.querySelector('#Patient_Yearofbirth'))).innerText).toBe('1998');
            expect((/** @type {HTMLElement} */ (el.querySelector('#Patient_Sex'))).innerText).toBe('Male');
        });

        it('should show no appointment', function (done) {
            const el = new XPatientRelated();
            el.folder = f;

            expect(el.hasAttribute('blocked')).toBeFalse();
            setTimeout(() => {
                expect(el.querySelector('#withoutAppointment').hasAttribute('hidden')).toBeFalse();
                expect(el.querySelector('#withAppointment').hasAttribute('hidden')).toBeTrue();
                done();
            });
        });

        it('should show appointment', function (done) {
            const el = new XPatientRelated();
            f.list.push(new Appointment(na));
            el.folder = f;
            expect(el.hasAttribute('blocked')).toBeFalse();
            setTimeout(() => {
                expect(el.querySelector('#withoutAppointment').hasAttribute('hidden')).toBeTrue();
                expect(el.querySelector('#withAppointment').hasAttribute('hidden')).toBeFalse();
                expect(el.querySelector('#withAppointment').innerHTML).toContain('2999-01-10');
                done();
            });
        });

        it('should show the closest appointment', function (done) {
            const el = new XPatientRelated();
            let nb = JSON.parse(JSON.stringify(na));
            nb.Nextappointment = '3999-01-12';
            f.list.push(new Appointment(na));
            f.list.push(new Appointment(nb));
            el.folder = f;
            expect(el.hasAttribute('blocked')).toBeFalse();
            setTimeout(() => {
                expect(el.querySelector('#withoutAppointment').hasAttribute('hidden')).toBeTrue();
                expect(el.querySelector('#withAppointment').hasAttribute('hidden')).toBeFalse();
                expect(el.querySelector('#withAppointment').innerHTML).toContain('2999-01-10');
                done();
            });
        });
    });
});
