
import XPanel from './x-panel.js';
import { createElementWith, defineCustomElement } from '../../../js/custom-element.js';

/**
 * Slot[]: content to be shown in the panel
 * Slot[overlay]: overlay to be put on top when blocked
 */
export default class XOverlay extends XPanel {
    /**
     * @override
     */
    getXPanelContent() {
        return createElementWith('span', {}, [
            createElementWith('style', { 'css-inherit-local': true }, `
:host {
    box-sizing: border-box;
    padding: 0px;
}

x-panel#overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    color: white;

    background-color: rgba(0.3,0.3,0.3, 0.8); /* Black w/opacity */
    overflow-x: hidden;
    transition: 0.5s;

    display: none;
}

x-panel#overlay > slot, x-panel#overlay > span[slot-overlay] {
    background-color: rgba(0,0,0, 1); /* Black w/opacity */
    padding: 10px;
    border-radius: 10px;
}

x-panel#overlay > #close {
    position: absolute;
    top: 20px;
    right: 45px;

    background-color: transparent;
    border: none;
    color: white;
    font-size: large;
    font-weight: bold;

    display: none;
}

x-panel#overlay > #close:hover, x-panel#overlay > #close:focus {
    text-decoration: none;
    color: #f1f1f1;
}

/*
 * Custom styles
 */

:host([blocked]) x-panel#overlay {
    display: block;
}

:host([global]) x-panel#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

:host([closable]) x-panel#overlay > #close {
    display: block;
}

/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
@media screen and (max-height: 450px) {
    #close {
        font-size: 40px;
        top: 15px;
        right: 35px;
    }
}`
            ),
            this.getXOverlayContent(),
            createElementWith(XPanel, { id: 'overlay' }, [
                createElementWith('button', { id: 'close' }, '✕',
                    (el) => el.addEventListener('click', () => this.free())
                ),
                this.getXOverlayOverlay()
            ])
        ]);
    }

    /**
     * @returns {HTMLElement} to be inserted
     */
    getXOverlayContent() {
        return document.createElement('slot');
    }

    /**
     * @returns {HTMLElement} to be inserted
     */
    getXOverlayOverlay() {
        const slot = document.createElement('slot');
        slot.setAttribute('name', 'overlay');
        return slot;
    }

    block() {
        this.setAttribute('blocked', 'blocked');
    }

    free() {
        this.removeAttribute('blocked');
    }

    isBlocked() {
        return this.hasAttribute('blocked');
    }
}

defineCustomElement(XOverlay);
