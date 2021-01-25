
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

/**
 * @param {string | typeof HTMLElement} tag to be created
 * @param {object} attributes to be set
 * @param {Array<HTMLElement | string> | HTMLElement | string} inner to fill in
 * @param {function(HTMLElement): void} js to modify the element
 * @returns {HTMLElement} with all this set
 */
export function createElementWith(tag, attributes = {}, inner = [], js = (_el) => { }) {
    const el = (typeof (tag) == 'string')
        ? document.createElement(tag)
        : new tag();

    for (const k of Object.keys(attributes)) {
        if (attributes[k] === false) {
            continue;
        }
        if (attributes[k] === true) {
            el.setAttribute(k, k);
            continue;
        }
        el.setAttribute(k, attributes[k]);
    }

    if (!Array.isArray(inner)) {
        inner = [inner];
    }

    for (const k in inner) {
        const v = inner[k];
        if (typeof (v) == 'string') {
            el.insertAdjacentText('beforeend', v);
        } else {
            el.insertAdjacentElement('beforeend', v);
        }
    }

    js(el);

    return el;
}
