
(function() {
    class XWrite extends JHElement {
        static get properties() {
            return {
                "name":   "String",
                "type":   "String",
                "value":  "String",
                "inline": "String"
            }
        }

        adapt() {
            if (!this.type) {
                this.innerHTML = `<span id='${this.value}' class='error'>Read: key is not defined: '${this.type}'</span>`;
                return;
            }

            let el = false;

            switch(this.type) {
                case "timestamp":
                    this.innerHTML = `<x-read name='${this.name}' type='${this.type}' value='${this.value}' ${this.inline}></x-read>`;
                    this.getValue = () => this.value;
                    break;
                case "boolean":
                    this.innerHTML = `<input name='${this.name}' type='checkbox' ${this.value ? 'checked' : ''}/>`;
                    el = this.querySelector('input');
                    this.getValue = () => el.checked;
                    break;
                case "date":
                    this.innerHTML = `<input type='date' value='${this.value}' ${this.inline} />`;
                    el = this.querySelector('input');
                    this.getValue = () => el.value;
                    break;
                case "numeric":
                    this.innerHTML = `<input type='number' value='${this.value}' ${this.inline} />`;
                    el = this.querySelector('input');
                    this.getValue = () => {
                        if (el.value === "") {
                            return null;
                        }
                        return parseFloat(el.value);
                    }
                    break;
                case "char":
                    this.innerHTML = `<input value='${this.value}' ${this.inline} />`;
                    el = this.querySelector('input');
                    this.getValue = () => el.value;
                    break;
                // case "text":
                    // this.innerHTML = `<span name='${this.name}' style='white-space: pre'>${this.value}</span>`;  
                    // break;
                // case "list":
                //     break;
                default:
                    console.error("Type unknown: ", this.type);
                    this.innerHTML = `<span name='${this.name}' class='error'>unknown type: ${this.type}</span>`;
                    break;
            }
            
            if (el) {
                const val = this.getValue();
                el.addEventListener("change", () => { 
                    this.fire("change", val)
                    if (this.value != val) {
                        this.value = val;
                    }
                });
            }
        }

        getValue() {
            return this.value;
        }
    }

    window.customElements.define('x-write', XWrite);
})();
