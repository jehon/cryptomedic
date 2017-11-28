
(function() {
    class XWrite extends JHElement {
        static get properties() {
            return {
                "type":     "String",
                "value":    "String",
                "inline":   "String",
                "list":     "Object",
                "listName": "String"
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
                    this.innerHTML = `<x-read type='${this.type}' value='${this.value}' ${this.inline}></x-read>`;
                    this.getValue = () => this.value;
                    break;
                case "boolean":
                    this.innerHTML = `<input type='checkbox' ${this.value ? 'checked' : ''}/>`;
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
                case "text":
                    this.innerHTML = `<textarea>${this.value}</textarea>`;
                    el = this.querySelector('textarea');
                    this.getValue = () => el.value;
                    break;
                case "list":
                    this.innerHTML = `<x-write-list value='${this.value}' list='${JSON.stringify(this.list)}' list-name='${this.listName}' ${this.inline}></x-write-String>`;
                    el = this.querySelector('x-write-list');
                    this.getValue = () => el.getValue();
                    break;
                default:
                    console.error("Type unknown: ", this.type);
                    this.innerHTML = `<span class='error'>unknown type: ${this.type}</span>`;
                    break;
            }
            
            if (el) {
                el.addEventListener("change", () => { 
                    const v = this.getValue();
                    this.fire("change", v);
                });
            }
        }
    }

    window.customElements.define('x-write', XWrite);
})();
