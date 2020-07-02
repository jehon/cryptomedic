
/**
 * @param {Element} root - the element to start with
 * @param {string} attr - the property name to be set
 * @param {*} value - the value to be dispatched
 * @returns {Element} the root element
 */
export default function setPropertyOn(root, attr, value) {
    if (root.hasAttribute('x-top')) {
        root.querySelectorAll(`[with-${attr}]`).forEach(el => {
            el[attr] = value;
        });
    }

    if (root.shadowRoot) {
        root.shadowRoot.querySelectorAll(`[with-${attr}]`).forEach(el => {
            el[attr] = value;
        });
    }
    return root;
}
