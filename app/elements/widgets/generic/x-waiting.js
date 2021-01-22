
import XOverlay from './x-overlay.js';
import { insertInSlot } from '../../element-helpers.js';
import { defineCustomElement } from '../../../js/custom-element.js';

/**
 * Slot[]: content
 */
export default class XWaiting extends XOverlay {
    constructor() {
        super();
        insertInSlot(this, 'overlay', '<img src=\'/static/img/waiting.gif\' /> Loading<slot name="waiting"></slot>');
    }

    aroundPromise(p) {
        this.block();
        return p.then((data) => {
            this.free();
            return data;
        })
            .catch((error) => {
                this.free();
                throw error;
            });
    }
}

defineCustomElement(XWaiting);
