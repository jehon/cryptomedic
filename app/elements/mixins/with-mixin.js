
import setPropertyOn from '../../js/set-property.js';
import { toPropertyCase, toAttributeCase } from '../../js/string-utils.js';

/**
 * @mixin
 * @param {string} name - the property name, in CamelCase
 * @param {HTMLElement} cls - an element to be extended
 * @returns {Element} - the same htmlElement that listen to the folder
 */
const WithMixin = (name, cls) =>
    /**
     * @augments HTMLElement
     * @param {HTMLElement} cls
     */
    class extends cls {
        // Transform to camel-case
        constructor() {
            super();
            const propertyName = toPropertyCase(name);
            const attributeName = toAttributeCase(name);
            const changeFunction = `on${toPropertyCase(name, true)}Changed`;

            this.setAttribute(`with-${attributeName}`, `with-${attributeName}`);

            // onPropertyChanged:
            this[changeFunction] = () => { };

            let value;
            Object.defineProperty(this, propertyName, {
                get: () => value,
                set: (v) => {
                    value = v;
                    setPropertyOn(this, propertyName, value);
                    this[changeFunction](value);
                }
            });
        }
    };

export default WithMixin;
