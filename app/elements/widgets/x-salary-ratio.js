
import { defineCustomElement } from '../../js/custom-element';
import XWithFolder from '../abstract/x-with-folder.js';

export default class XSalaryRatio extends XWithFolder {
    adapt() {
        this.innerHTML = `<span slot='content'>${Math.round(this.folder.getPatient().ratioSalary() * 100) / 100}</span>`;
    }
}

defineCustomElement(XSalaryRatio);
