
(function() {
    class XRead extends JHElement {
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
                    let display = "";
                    if (this.value > "") {
                        let date = new Date(Date.parse(this.value));  
                        if (isNaN(date.getYear())) {
                            display = "";
                        } else {
                            display = date.toLocaleDateString() + " " + date.toLocaleTimeString();
                        }
                    }
                    this.innerHTML = `<span name='${this.name}'>${display}</span>"`;
                    break;
                case "boolean":
                    this.innerHTML = `<x-read-boolean name='${this.name}' value='${this.value}'></x-read-boolean>`;
                    break;
                case "list":
                case "date":
                case "numeric":
                case "char":
                    this.innerHTML = `<span name='${this.name}'>${this.value}</span>`;  
                    break;
                case "text":
                    this.innerHTML = `<span name='${this.name}' style='white-space: pre'>${this.value}</span>`;  
                    break;

                default:
                    console.error("Type unknown: ", this.type);
                    this.innerHTML = `<span name='${this.name}'>unknown type: ${this.type}</span>`;
                    break;
            }
        }
    }

    window.customElements.define('x-read', XRead);
})();
