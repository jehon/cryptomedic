
import { toAttributeCase } from './string-utils.js';

/**
 * @param {object} cl - the class defining the object
 * @param {string} [name] - the name of the class
 * @returns {string} the calculated name
 */
export function defineCustomElement(cl, name = toAttributeCase(cl.name)) {
    customElements.define(name, cl);
    return name;
}
