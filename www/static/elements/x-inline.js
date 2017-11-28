
(function() {
    const element = Symbol("element");

    class XInline extends JHElement {
        static get properties() {
            return {
                "type":     "String",
                "value":    "String",
                "edit":     "Boolean",
                "inline":   "String",
                "list":     "Object",
                "listName": "String"
            }
        }

        adapt() {
            if (this.edit) {
                this.innerHTML = `<x-write type='${this.type}' 
                        value='${this.value}' 
                        list='${JSON.stringify(this.list)}' list-name='${this.listName}'
                        inline='${this.inline}' 
                    ></x-write>`;
                this[element] = this.querySelector("x-write");
                this[element].addEventListener("change", () => {
                    this.fire("change", this.getValue());
                });
            } else {
                this.innerHTML = `<x-read type='${this.type}' value='${this.value}' inline='${this.inline}'></x-read>`;
            }
        }

        getValue() {
            if (this.edit) {
                return this[element].getValue();
            }
            return this.value;
        }
    }

    window.customElements.define('x-inline', XInline);
})();
