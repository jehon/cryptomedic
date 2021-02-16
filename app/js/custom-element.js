
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
 * @param {function(Element): void} js to modify the element
 */
function enrichObject(el, attributes = {}, inner = [], js = (_el) => { }) {
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
        if (v == null) {
            continue;
        }
        if (typeof (v) == 'string') {
            el.insertAdjacentText('beforeend', v.trim());
        } else {
            el.insertAdjacentElement('beforeend', v);
        }
    }

    js(el);
}

// LEGACY: use flexbox instead !
// /**
//  * Resize automatically the first "innerHTML" "[full]" element
//  * based on the the element size.
//  *
//  * Example:
//  *   connectedCallback() {
//  *     resizeChildrenBasedOn(this)
//  *   }
//  *
//  * Rationale:
//  *    When a "innerHTML" has a "height: 100%", it take the whole space of its parent
//  *    eventhough it is included in a <slot /> that can not take 100% of parent
//  *
//  *    This emulate thus the "fill the height" bevavior by calculating the target height
//  *    of the "innerHTML" with the "full" element (child only - not deeper in the innerHTML!).
//  *
//  * TODO: collapsable margins + pseudo elements (::before, ::after)
//  *
//  * @param {HTMLElement} base - the base element
//  * @returns {function(void):void} to stop watching
//  */
// export function resizeChildrenBasedOn(base) {
//     // console.groupCollapsed('Initialize resize', base);
//     /**
//      * @param {string} msg to debug
//      * @param {HTMLElement} el to be meseared
//      * @param {boolean} inside - true if we take only the inside part
//      * @returns {number} the height
//      */
//     const h = (msg, el, inside = false) => {
//         const cs = window.getComputedStyle(el);
//         const h = el.getBoundingClientRect().height
//             + (inside ? 0 : parseInt(cs.marginTop) + parseInt(cs.marginBottom));
//         // console.log(msg, el, h, el.getBoundingClientRect().height, cs.marginTop, cs.marginBottom);
//         return h;
//     };

//     // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
//     // offsetHeight: content + padding + border
//     // clientHeight: content + padding
//     // scrollHeight:
//     // getBoundingClientRect(): content + padding + border - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

//     let resizable;
//     const listing = /** @type {Array<HTMLElement>} */(Array.from(base.children))
//         .filter(e => e instanceof HTMLElement);

//     if (listing.length == 1) {
//         resizable = listing[0];
//     } else {
//         const fullListing = listing.filter(e => e.hasAttribute('full'));
//         if (fullListing.length > 0) {
//             resizable = fullListing[0];
//             // TODO: hr is not workin
//             // } else {
//             //     const hrListing = listing.filter(e => e.tagName == 'HR');
//             //     if (hrListing.length > 0) {
//             //         resizable = hrListing[0];
//             //     }
//         }
//     }

//     if (!resizable) {
//         // console.error('No resizable found for ', base);
//         return;
//     }
//     // console.log('resizable', resizable, resizable.style);
//     resizable.style.boxSizing = 'border-box';

//     const resizeObserver = new ResizeObserver(_entries => {
//         // console.groupCollapsed('resizer', base);
//         const baseHeight = h('base', base, true);
//         const shadowHeight = Array.from(base.shadowRoot.children).reduce(
//             (acc, el) => acc + h('shadow', el),
//             0
//         );
//         const resizableInitHeight = h('resizable', resizable);
//         const availableSpace = baseHeight - shadowHeight;

//         const resizableFinalHeight = resizableInitHeight + availableSpace;

//         // console.log('resize', {
//         //     base,
//         //     baseHeight,
//         //     shadowHeight,
//         //     availableSpace,
//         //     resizable,
//         //     resizableInitHeight,
//         //     resizableFinalHeight
//         // });

//         resizable.style.height = resizableFinalHeight + 'px';
//         // console.groupEnd();
//         // resizeObserver.disconnect();
//     });

//     resizeObserver.observe(base);
//     // console.groupEnd();

//     return () => resizeObserver.disconnect();
// }