
import XWithFile from '../abstract/x-with-file';
import { defineCustomElement } from '../../js/custom-element';

export default class XBmi extends XWithFile {
    adapt() {
        this.innerHTML = `<span slot='content'>${Math.round(this.file.bmi() * 10) / 10}</span>`;
    }
}

defineCustomElement(XBmi);
