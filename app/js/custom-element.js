import { toAttributeCase } from './string-utils.js';


/**
 * @param {object} cl - the class defining the object
 */
export function defineCustomElement(cl) {
    const name = toAttributeCase(cl.name);
    window.customElements.define(name, cl);
}
