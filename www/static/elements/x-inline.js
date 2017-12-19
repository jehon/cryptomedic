
(function() {
    const element = Symbol("element");

    class XInline extends JHElement {
        static get properties() {
            return {
                "type":     "String",
                "value":    "String",
                "edit":     "Boolean",
                "list":     "Object",
                "listName": "String"
            }
        }

        adapt() {
            let inline = ""; //= this.attributes;
            for(const a of this.attributes) { 
                const n = a.name;
                if (n == "name" || n == "id" || n == "type") {
                    continue;
                }
                if (n in this.constructor.properties) {
                    continue;
                }
                if (n.substr(0, "edit".length) == "edit") {
                    continue;
                }
                inline += ` ${n}='${a.value}'`;
            }

            if (this._edit) {
                this.innerHTML = `<x-write type='${this._type}' ${inline}
                        value='${this._value}' 
                        list='${JSON.stringify(this._list)}' 
                        list-name='${this._listName}'
                    ></x-write>`;
                this[element] = this.querySelector("x-write");
                this[element].addEventListener("changed", () => {
                    // value is calculated at getter below
                    this.fire("changed", this.value);
                });
            } else {
                this.innerHTML = `<x-read type='${this._type}' value='${this._value}' ${inline}></x-read>`;
                this[element] = this.querySelector("x-read");
            }
        }

        set value(v) {
            this.attributeChangedCallback("value", this._value, v);
        }

        get value() {
            return this[element].value;
        }

        blur() {
            super.blur();
            this.fire("changed", this.value);
        }
    }

    window.customElements.define('x-inline', XInline);
})();
