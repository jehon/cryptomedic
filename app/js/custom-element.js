
import { toAttributeCase } from './string-utils.js';

/**
 * @param {(new() => HTMLElement)|HTMLElement} cls to be analysed
 * @returns {string} as the class name
 */
export function getHTMLNameOfClass(cls) {
    if (cls instanceof HTMLElement) {
        cls = /** @type {new () => HTMLElement} */ (cls.constructor);
    }

    return toAttributeCase(cls.name);
}

/**
 * @param {object} cls - the class defining the object
 * @param {string} [name] - the name of the class
 * @returns {string} the calculated name
 */
export function defineCustomElement(cls, name = getHTMLNameOfClass(cls)) {
    customElements.define(name, cls);
    return name;
}

/**
 * @template {HTMLElement} X
 * @param {new() => X} tag to be created
 * @param {object} attributes to be set
 * @param {Array<HTMLElement | string> | string} inner to fill in
 * @param {function(HTMLElement): void} js to modify the element
 * @returns {X} with all this set
 */
export function createElementWithObject(tag, attributes = {}, inner = [], js = (_el) => { }) {
    const el = new tag();

    enrichObject(el, attributes, inner, js);

    return el;
}

/**
 * @param {string} tag to be created
 * @param {object} attributes to be set
 * @param {Array<HTMLElement | string> | string} inner to fill in
 * @param {function(HTMLElement): void} js to modify the element
 * @returns {HTMLElement} with all this set
 */
export function createElementWithTag(tag, attributes = {}, inner = [], js = (_el) => { }) {
    const el = document.createElement(tag);

    enrichObject(el, attributes, inner, js);
    return el;
}

/**
 * @param {string} html to be parsed
 * @returns {Array<HTMLElement>} parsed
 */
export function createElementsFromHTML(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();

    return /** @type {Array<HTMLElement>} */ (Array.from(template.content.children));
}

/**
 * @param {Element} el the element
 * @param {object} attributes to be set
 * @param {Array<Element | string>| string} inner to fill in
 * @param {function(Element): void} callback to modify the element
 */
export function enrichObject(el, attributes = {}, inner = [], callback = (_el) => { }) {
    for (const k of Object.keys(attributes)) {
        let val = attributes[k];

        if (val === null) {
            val = '';
        }

        if (val === false) {
            continue;
        }

        if (val === true) {
            val = k;
        }

        if (Array.isArray(val)) {
            val = JSON.stringify(val);
        }

        if (typeof (val) == 'object') {
            val = Object.keys(val).map((k) => `${toAttributeCase(k)}: ${val[k]}`).join(';');
        }
        el.setAttribute(toAttributeCase(k), val);
    }

    if (!Array.isArray(inner)) {
        inner = [inner];
    }

    for (const k in inner) {
        const v = inner[k];
        if (v == null) {
            continue;
        }
        if (typeof (v) == 'string' || typeof (v) == 'number') {
            el.insertAdjacentText('beforeend', (v + '').trim());
        } else {
            el.insertAdjacentElement('beforeend', v);
        }
    }

    callback(el);
}
