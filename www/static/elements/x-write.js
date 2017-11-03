
(function() {
    class XWrite extends JHElement {
        static get properties() {
            return {
                "name":  "String",
                "type":  "String",
                "value": "String"
            }
        }

        adapt() {
            if (!this.type) {
                this.innerHTML = `<span id='${this.value}' class='error'>Read: key is not defined: '${this.type}'</span>`;
                return;
            }

            switch(this.type) {
                case "timestamp":
                    this.innerHTML = `<x-read name='${this.name}' type='${this.type}' value='${this.value}'></x-read>`;
                    break;
                case "boolean":
                    // this.innerHTML = `<read-boolean name='${this.name}' value='${this.value}'></read-boolean>`;
                    break;
                case "list":
                    break;
                case "date":
                    break;
                case "numeric":
                    break;
                case "char":
                    // this.innerHTML = `<span name='${this.name}'>${this.value}</span>`;  
                    break;
                case "text":
                    // this.innerHTML = `<span name='${this.name}' style='white-space: pre'>${this.value}</span>`;  
                    break;
                default:
                    console.error("Type unknown: ", this.type);
                    this.innerHTML = `<span name='${this.name}'>unknown type: ${this.type}</span>`;
                    break;
            }
        }
    }

    window.customElements.define('x-write', XWrite);
})();
