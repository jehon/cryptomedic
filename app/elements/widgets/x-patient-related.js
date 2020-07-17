
import XWithFolder from '../abstract/x-with-folder.js';

import date2CanonicString from '../../js/date2CanonicString.js';
import Appointment from '../../models/Appointment.js';
import '../panels/x-group-panel.js';

// http://localhost:5555/build/index.html#/folder/6/file/RicketConsult/3

export default class XPatientRelated extends XWithFolder {
    constructor() {
        super();
        this.style.width = '100%';
    }

    _nextAppointment() {
        const today = date2CanonicString(new Date(), true);
        var next = '';
        this.folder.getListByType(Appointment).forEach((v, _k) => {
            if (v.Nextappointment > today) {
                if (!next || v.Nextappointment < next) {
                    next = v.Nextappointment;
                }
            }
        });
        return next;
    }

    adapt() {
        const patient = this.folder.getPatient();
        const nextAppointment = this._nextAppointment();

        this.innerHTML = `
<span slot='content'>
    <x-group-panel class='related' title='Related Patient'>
        <table>
            <tbody>
                <tr>
                    <td rowspan='100' align='left' width='100px'>
                        <img src="/static/img/patient.gif">
                        <br/>
                        <a class='textbutton' href="#/folder/${patient.id}">
                            <img src="/static/img/go.gif">view
                        </a>
                    </td>
                </tr>
                <tr>
                    <td><label>Reference</label></td>
                    <td>
                        <span id='Patient_entryyear'>${patient.entryyear}</span>
                        -
                        <span id='Patient_entryorder'>${patient.entryorder}</span>
                    </td>
                </tr>
${patient.Name ? `
                <tr>
                    <td>Name</td>
                    <td><span id='Patient_Name'>${patient.Name}</span></td>
                </tr>
`: ''}
${patient.Yearofbirth ? `
                <tr>
                    <td>Year of birth</td>
                    <td><span id='Patient_Yearofbirth'>${patient.Yearofbirth}</span></td>
                </tr>
`: ''}
${patient.Sex ? `
                <tr ng-class='{ emptyValue: !folder.getPatient().Sex}'>
                    <td>Sex</td>
                    <td><span id='Patient_Sex'>${patient.Sex}</span></td>
                </tr>
`: ''}
            </tbody>
        </table>
    </x-group-panel>
    <x-group-panel class='related' title='Agenda'>
        <table>
            <tbody>
                <tr>
                    <td rowspan='100' align='left' width='100px'>
                        <img src="/static/img/consultOfDay.gif" width='75px'>
                    </td>
                    <td class='text-center'>
                        <div id='withAppointment' class='alert alert-info' style='margin-bottom: 0px'>
                            Next appointment: ${nextAppointment}
                        </div>
                        <div id='withoutAppointment' class='alert alert-danger' style='margin-bottom: 0px'>
                            No next appointment planned.
                            <a class='notModeWrite btn btn-default' href="#/folder/${patient.id}/file/Appointment">Add an appointment</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </x-group-panel>
</span>`;

        if (nextAppointment) {
            this.querySelector('#withAppointment').removeAttribute('hidden');
            this.querySelector('#withoutAppointment').setAttribute('hidden', 'hidden');
        } else {
            this.querySelector('#withAppointment').setAttribute('hidden', 'hidden');
            this.querySelector('#withoutAppointment').removeAttribute('hidden');
        }
    }
}

window.customElements.define('x-patient-related', XPatientRelated);
