
let JHElement = (function() {
    const initialized = Symbol("initialized");

    class JHElement extends HTMLElement {  
        constructor() {
            super();
            this[initialized] = false;
        }

        static get observedAttributes() {
            if (this.properties) {
                return Object.keys(this.properties);
            }
            return [];
        }

        attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
            let props = this.constructor.properties;
            if (this.properties) {
                props = this.properties;
            }
            if (props && props[attributeName]) {
                switch(props[attributeName]) {
                    case "Boolean":
                        this[attributeName] = this.hasAttribute(attributeName);
                        break;
                    case "Object":
                        this[attributeName] = JSON.parse(newValue);
                        break;
                    case "Integer":
                        this[attributeName] = Number.parseFloat(newValue);
                        break;
                    default:
                        this[attributeName] = newValue;
                }
            } else {
                this[attributeName] = newValue;
            }
            this.adaptIfInitialized();
        }


        connectedCallback() {
            if (!this[initialized]) {
                this[initialized] = true;
                this.render();
            }
            this.adapt();
        }

        render() {}

        adaptIfInitialized() {
            if (this[initialized]) {
                this.adapt();
            }
        }

        adapt() {}
    };

    window.customElements.define('jh-element', JHElement);

    return JHElement;
})();

