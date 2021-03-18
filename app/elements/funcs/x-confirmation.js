

import { actions } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XButton from '../render/x-button.js';
import XButtons from '../render/x-buttons.js';
import XGroupPanel from '../render/x-group-panel.js';
import XPanel from '../render/x-panel.js';

/**
 * TODO:
 *   - button in the color of what is to be confirmed (delete / message)
 *   - use x-overlay
 *
 * attributes:
 * - id: the id of the user where to change the password
 */
export default class XConfirmation extends HTMLElement {
    static get observedAttributes() {
        return ['name'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWithTag('css-inherit'),
            createElementWithTag('style', {}, `
x-group-panel {
    max-width: 500px;
    min-width: min(500px, 100%);
}
            `),
            createElementWithObject(XPanel, {}, [
                createElementWithObject(XGroupPanel, { title: 'Confirmation', style: { maxWidth: '200px' } }, [
                    createElementWithTag('slot'),
                    createElementWithObject(XButtons, {}, [
                        createElementWithObject(XButton, { action: actions.commit }, 'Ok',
                            el => el.addEventListener('click', () => this.dispatchEvent(new CustomEvent('validated'))))
                    ])
                ]),
            ])
        );
    }
}

defineCustomElement(XConfirmation);
