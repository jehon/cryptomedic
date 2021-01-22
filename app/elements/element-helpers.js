
/**
 * Convert html string into an element
 *
 * @param {string} html - an html string
 * @returns {Element} the html translated
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return /** @type {Element} */ (/** @type {*} */ template.content.firstChild);
}

/**
 * Replace the slot in the element's shadowRoot by the content
 * For the default slot
 *
 * @param {Element} element - the element where to insert
 * @param {string} content - an html string to insert
 */
export function insertInSlotDefault(element, content) {
    element.shadowRoot.querySelector('slot').replaceWith(htmlToElement(`<span from-slot='-' debug-replaced-by='${element.tagName.toLowerCase()}'>${content}</span>`));
}

/**
 * Replace the slot in the element's shadowRoot by the content
 * For the default slot
 *
 * @param {Element} element - the element where to insert
 * @param {string} name - the name of the slot
 * @param {string} content - an html string to insert
 */
export function insertInSlot(element, name, content) {
    element.shadowRoot.querySelector(`slot[name=${name}]`).replaceWith(htmlToElement(`<span from-slot='${name}' debug-replaced-by='${element.tagName.toLowerCase()}'>${content}</span>`));
}
