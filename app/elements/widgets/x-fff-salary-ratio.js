
import { defineCustomElement } from '../../js/custom-element.js';
import XWithFile from '../abstract/x-with-file.js';

export default class XFffSalaryRatio extends XWithFile {
    formula() {
        return Math.round(this.file.ratioSalary() * 100) / 100;
    }
}

defineCustomElement(XFffSalaryRatio);
