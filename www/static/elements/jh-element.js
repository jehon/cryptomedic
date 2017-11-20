
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
            this._setDefaultValues();
        }

        _setDefaultValues() {
            if(!this.constructor.properties) {
                return 
            }
            Object.keys(this.constructor.properties).forEach(k => {
                switch(this.constructor.properties[k]) {
                    case "Boolean":
                        this[k] = false;
                        break;
                    case "Object":
                        this[k] = null;
                        break;
                    case "Integer":
                        this[k] = 0;
                        break;
                    default:
                        this[k] = "";
                }
            })
        }

        static get observedAttributes() {
            if (this.properties) {
                return Object.keys(this.properties).map(k => camelToSnake(k));
            }
            return [];
        }

        static fireOn(target, name, data = {}) {
            var event = new CustomEvent(name, { detail: data });
            target.dispatchEvent(event);
        }


        attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
            // snake-case to camel-case
            attributeName = snakeToCamel(attributeName);

            let props = this.constructor.properties;
            if (props && props[attributeName]) {
                switch(props[attributeName]) {
                    case "Boolean":
                        if (!this.hasAttribute(attributeName)) {
                            this[attributeName] = false;
                        } else {
                            if (newValue === "false") {
                                this[attributeName] = false;
                            } else {
                                this[attributeName] = true;
                            }
                        }
                        break;
                    case "Object":
                        try {
                            this[attributeName] = JSON.parse(newValue);
                        } catch(e) {
                            this[attributeName] = null;
                        }
                        break;
                    case "Integer":
                        this[attributeName] = Number.parseFloat(newValue);
                        break;
                    default:
                        if (newValue === 'null') {
                            this[attributeName] = null;
                        } else {
                            this[attributeName] = newValue;
                        }
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
            JHElement.fireOn(this, name, data);
        }

        createElementAndAddThem(html, to = this) {
            var template = document.createElement('template');
            template.innerHTML = html.trim();

            if (to != null) {
                to.innerHTML = "";
                template.content.childNodes.forEach(el => to.appendChild(el));
            }
            return template.content.childNodes;
        }
    };

    window.customElements.define('jh-element', JHElement);

    return JHElement;
})();

