
(function() {
    class XInline extends JHElement {
        static get properties() {
            return {
                "name":   "String",
                "type":   "String",
                "value":  "String",
                "edit":   "Boolean",
                "inline": "String"
            }
        }

        adapt() {
            if (this.edit) {
                this.innerHTML = `<x-write name='${this.name}' type='${this.type}' value='${this.value}' inline='${this.inline}'></x-write>`;
            } else {
                this.innerHTML = `<x-read name='${this.name}' type='${this.type}' value='${this.value}' inline='${this.inline}'></x-read>`;
            }
        }
    }

    window.customElements.define('x-inline', XInline);
})();
