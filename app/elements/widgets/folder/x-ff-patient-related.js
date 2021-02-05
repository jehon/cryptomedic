
import { defineCustomElement } from '../../../js/custom-element.js';
import { routeToFolderPatient } from '../../../js/router.js';
import setPropertyOn from '../../../js/set-property.js';
import XWithFolder from './x-with-folder.js';
import '../../render/x-group-panel.js';
import '../file/x-fff-field.js';


export default class XFfPatientRelated extends XWithFolder {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // this.style.width = '100%';
        this.shadowRoot.innerHTML = `
            <x-group-panel class='related' title='Related Patient'>
                <div slot='versal'>
                    <img src="/static/img/patient.gif">
                </div>
                <x-fff-field label='Reference' field='entryorder'>
                    <div></div>
                </x-fff-field>
                <x-fff-field field='Name'></x-fff-field>
                <x-fff-field field='Yearofbirth'></x-fff-field>
                <x-fff-field field='Sex'></x-fff-field>
            </x-group-panel>`;

        this.addEventListener('click', () => routeToFolderPatient(this.folder.getId()));
    }

    adapt() {
        const patient = this.folder.getPatient();
        const pen = `${patient.entryyear}-${patient.entryorder}`;
        this.setAttribute('patient-entry-number', pen);
        setPropertyOn(this, 'file', patient);
        this.shadowRoot.querySelector('[field=entryorder]').innerHTML = pen;
    }
}

defineCustomElement(XFfPatientRelated);
