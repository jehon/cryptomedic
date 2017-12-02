
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

    function withInitialUpper(s) {
        return s[0].toUpperCase() + s.substring(1);
    }

    function defaultValue(type) {
        switch(type) {
            case "Boolean": return false;
            case "Object":  return null;
            case "Integer": return 0;
        }
        return "";
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
                const ki = '_' + k;
                if (!(ki in this)) {
                    this[ki] = defaultValue(this.constructor.properties[k]);
                }
                if (!(k in this)) {
                    Object.defineProperty(this, k, {
                        get: () => { return this[ki] },
                        set: (v) => { this[ki] = v; }
                    });
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

        static _canonizeBoolean(v) {
            if (v == null) {
                return false;
            }
            if (v === "false") {
                return false;
            } 
            return true;
        }

        isInitialized() {
            return this[initialized];
        }

        attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
            // snake-case to camel-case
            const attributeNameCamel = snakeToCamel(attributeName);
            const attributeNameInternal = '_' + attributeNameCamel

            let props = this.constructor.properties;
            if (props && props[attributeNameCamel]) {
                if (newValue === "null" || newValue === "undefined") {
                    this[attributeNameInternal] = defaultValue(props[attributeNameCamel]);
                } else {
                    switch(props[attributeNameCamel]) {
                        case "Boolean":
                            this[attributeNameInternal] = this.constructor._canonizeBoolean(newValue);
                            break;
                        case "Object":
                            try {
                                this[attributeNameInternal] = JSON.parse(newValue);
                            } catch(e) {
                                this[attributeNameInternal] = null;
                            }
                            break;
                        case "Integer":
                            this[attributeNameInternal] = Number.parseFloat(newValue);
                            break;
                        default:
                            this[attributeNameInternal] = newValue;
                    }
                }
            } else {
                if (newValue == "null" || newValue == "undefined") {
                    this[attributeNameInternal] = "";
                } else {
                    this[attributeNameInternal] = newValue;
                }
            }
            if (this.isInitialized()) {
                // onValueChanged(new value);
                const cb = "on" + withInitialUpper(attributeNameCamel) + "Changed"
                if (typeof(this[cb]) == 'function') {
                    this[cb](this[attributeNameInternal]);
                }
            }
            this.adaptIfInitialized();
        }

        connectedCallback() {
            if (!this.isInitialized()) {
                this[initialized] = true;
                this.render();
            }
            this.adapt();
        }

        render() {}

        adaptIfInitialized() {
            if (this.isInitialized()) {
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

