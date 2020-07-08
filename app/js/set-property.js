
import { toAttributeCase, toPropertyCase } from './string-utils.js';

/**
 * @param {Element} root - the element to start with
 * @param {string} name - the property name to be set
 * @param {*} value - the value to be dispatched
 * @returns {Element} the root element
 */
export default function setPropertyOn(root, name, value) {
    const attr = toAttributeCase(name);
    const prop = toPropertyCase(name);

    if (root.hasAttribute('x-top')) {
        root.querySelectorAll(`[with-${attr}]`).forEach(el => {
            el[prop] = value;
        });
    }

    if (root.shadowRoot) {
        root.shadowRoot.querySelectorAll(`[with-${attr}]`).forEach(el => {
            el[prop] = value;
        });
    }
    return root;
}
