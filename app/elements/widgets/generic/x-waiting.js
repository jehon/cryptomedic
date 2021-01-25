
import XOverlay from './x-overlay.js';
import { defineCustomElement, createElementWith } from '../../../js/custom-element.js';

/**
 * Slot[]: content
 */
export default class XWaiting extends XOverlay {
    /**
     * @override
     */
    getXOverlayOverlay() {
        return createElementWith('img', {
            src: '/static/img/waiting.gif'
        }, [
            'Loading',
            this.getXWaitingMessage()
        ]);
    }

    /**
     * @returns {HTMLElement} for the waiting message
     */
    getXWaitingMessage() {
        return createElementWith('slot', { 'name': 'waiting ' });
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
