
import '../../app/elements/widgets/x-patient-related.js';

import { webDescribe, loadReference } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import Appointment from '../../app/models/Appointment.js';

describe('tests/unit/x-patient-related-test.js', function () {
    let f;
    beforeEach(() => {
        f = new Folder(loadReference('FolderTest.test1.json').folder);
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

    webDescribe('initialized', '<x-patient-related></x-patient-related>', function (element) {
        it('should be initialized', function () {
            expect(element().isBlocked()).toBeTruthy();
        });

        it('should show patient informations', function () {
            element().folder = f;
            expect(element().isBlocked()).toBeFalsy();
            expect(element().querySelector('#Patient_entryyear').innerText).toBe('2000');
            expect(element().querySelector('#Patient_entryorder').innerText).toBe('1');
            expect(element().querySelector('#Patient_Name').innerText).toBe('rezaul islam');
            expect(element().querySelector('#Patient_Yearofbirth').innerText).toBe('1998');
            expect(element().querySelector('#Patient_Sex').innerText).toBe('Male');
        });

        it('should show no appointment', function (done) {
            element().folder = f;
            expect(element().isBlocked()).toBeFalsy();
            setTimeout(() => {
                expect(element().querySelector('#withoutAppointment').offsetWidth).toBeGreaterThan(0);
                expect(element().querySelector('#withAppointment').offsetWidth).toBe(0);
                done();
            });
        });

        it('should show appointment', function (done) {
            f.list.push(new Appointment(na));
            element().folder = f;
            expect(element().isBlocked()).toBeFalsy();
            setTimeout(() => {
                expect(element().querySelector('#withoutAppointment').offsetWidth).toBe(0);
                expect(element().querySelector('#withAppointment').offsetWidth).toBeGreaterThan(0);
                expect(element().querySelector('#withAppointment').innerText).toContain('2999-01-10');
                done();
            });
        });

        it('should show the closest appointment', function (done) {
            let nb = JSON.parse(JSON.stringify(na));
            nb.Nextappointment = '3999-01-12';
            f.list.push(new Appointment(na));
            f.list.push(new Appointment(nb));
            element().folder = f;
            expect(element().isBlocked()).toBeFalsy();
            setTimeout(() => {
                expect(element().querySelector('#withoutAppointment').offsetWidth == 0).toBeTruthy();
                expect(element().querySelector('#withAppointment').offsetWidth > 0).toBeTruthy();
                expect(element().querySelector('#withAppointment').innerText).toContain('2999-01-10');
                done();
            });
        });
    });
});
