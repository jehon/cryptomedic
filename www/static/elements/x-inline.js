
(function() {
    class XInline extends JHElement {
        static get properties() {
            return {
                "name":     "String",
                "type":     "String",
                "value":    "String",
                "edit":     "Boolean",
                "inline":   "String",
                "list":     "Object",
                "listName": "Object"
            }
        }

        adapt() {
            if (this.edit) {
                this.innerHTML = `<x-write name='${this.name}' type='${this.type}' 
                        value='${this.value}' 
                        list='${this.list}' list-name='${this.listName}'
                        inline='${this.inline}' 
                    ></x-write>`;
                let el = this.querySelector("x-write");
                el.addEventListener("change", () => {
                    this.fire("change", el.getValue());
                    this.value = el.getValue();
                });
            } else {
                this.innerHTML = `<x-read name='${this.name}' type='${this.type}' value='${this.value}' inline='${this.inline}'></x-read>`;
            }
        }

        getValue() {
            return this.value;
        }
    }

    window.customElements.define('x-inline', XInline);
})();
