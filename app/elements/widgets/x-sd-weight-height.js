
import XWithFile from '../abstract/x-with-file';
import { defineCustomElement } from '../../js/custom-element';

export default class XSdWeightHeight extends XWithFile {
    adapt() {
        this.innerHTML = `
        <span slot='content'>
            <x-standard-deviation
                sex="${this.folder.getPatient().sexStr()}"
                graph-name="wh"
                x="${this.file.Heightcm}"
                y="${this.file.Weightkg}"
            >
            </x-standard-deviation> sd
        </span>`;
    }
}

defineCustomElement(XSdWeightHeight);
