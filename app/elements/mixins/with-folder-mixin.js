
/**
 * @mixin
 * @param {Element} cls - an element to be extended
 * @returns {Element} - the same htmlElement that listen to the folder
 */
const WithFolderMixin = (cls) => {
    /**
     * @augments Element
     */
    class WithFolder extends cls {
        constructor(...args) {
            super(...args);
            this.setAttribute('with-folder', 'with-folder');
            this._folder = false;
        }

        get folder() {
            return this._folder;
        }

        set folder(f) {
            this._folder = f;
            setPropertyOn(this, 'folder', f);
            this.onFolderChanged(f);
        }

        onFolderChanged(_f) { }

        notifyFolderChanged() {
            this.onFolderChanged(this._folder);
        }
    }
    return WithFolder;
};

export default WithFolderMixin;

/**
 * @param {Element} root - the element to start with
 * @param {string} attr - the property name to be set
 * @param {*} value - the value to be dispatched
 * @returns {Element} the root element
 */
export function setPropertyOn(root, attr, value) {
    if (root.hasAttribute('x-top')) {
        root.querySelectorAll(`[with-${attr}]`).forEach((/** @type {WithFolderMixin} */ e) => {
            e[attr] = value;
        });
    }

    if (root.shadowRoot) {
        root.shadowRoot.querySelectorAll(`[with-${attr}]`).forEach((/** @type {WithFolderMixin} */ e) => {
            e[attr] = value;
        });
    }
    return root;
}
