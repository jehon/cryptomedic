
import XWithFile from '../abstract/x-with-file';
import { defineCustomElement } from '../../js/custom-element';

export default class XWH extends XWithFile {
    adapt() {
        this.innerHTML = `<span slot='content'>${Math.round(this.file.wh() * 100) / 100}</span>`;
    }
}

defineCustomElement(XWH);
