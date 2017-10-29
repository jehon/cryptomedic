
let JHElement = (function() {
    const initialized = Symbol("initialized");

    function snakeToCamel(s){
        let res = s.replace(/(\-\w)/g, function(m) { return m[1].toUpperCase(); });
        res[0] = res[0].toLowerCase();
        return res;
    }

    function camelToSnake(s){
        let res = s.replace(/([A-Z])/g, function(m) { return "-" + m[0].toLowerCase(); });
        return res;
    }

    class JHElement extends HTMLElement {  
        constructor() {
            super();
            this[initialized] = false;
        }

        static get observedAttributes() {
            if (this.properties) {
                return Object.keys(this.properties).map(k => camelToSnake(k));
            }
            return [];
        }

        attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
            // snake-case to camel-case
            attributeName = snakeToCamel(attributeName);

            let props = this.constructor.properties;
            // if (this.properties) {
            //     props = this.properties;
            // }
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

        fire(name, data = {}) {
            var event = new CustomEvent(name, { detail: data });
            this.dispatchEvent(event)
        }

        createElementFromString(html) {
            var template = document.createElement('template');
            template.innerHTML = html;
            return template.content.childNodes[0];
        }
    };

    window.customElements.define('jh-element', JHElement);

    return JHElement;
})();

