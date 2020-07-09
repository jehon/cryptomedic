
import XWithFile from '../abstract/x-with-file';
import { fromBirthDateTo } from './x-age.js';
import { defineCustomElement } from '../../js/custom-element';

export default class XSdBmi extends XWithFile {
    adapt() {
        this.innerHTML = `
        <span slot='content'>
            <x-standard-deviation
                sex="${this.folder.getPatient().sexStr()}"
                graph-name="bmi"
                x="${fromBirthDateTo(this.folder.getPatient().Yearofbirth, this.file.Date)}"
                y="${this.file.bmi()}"
            >
            </x-standard-deviation> sd
        </span>`;
    }
}

defineCustomElement(XSdBmi);
