
XWriteList = (function() {

    let referencesCB = jQuery.Callbacks("memory");

    let uuid = 1;

    class XWriteList extends JHElement {
        static setReferences(references = {}) {
            referencesCB.fire(references);
        }

        static get properties() {
            return {
                'value':     "String", 
                'list':      "Object", 
                'nullable':  "Boolean", 
                'list-name': "String" 
            };
        }

        constructor() {
            super();
            this.mode = false;
            this.references = {};

            this.uuid = uuid++;

            referencesCB.add((references) => {
                this.references = references;
                this.adaptIfInitialized();
            });
        }

        adapt() {
            if (this.listName) {
                if (typeof(this.references[this.listName]) == 'undefined') {
                  this.list = [];
                } else {
                  this.list = this.references[this.listName];  
                }       
            }
            if (!this.list) {
                this.list = [];
            }
            if (this.list.length == 0) {
                this.mode = 'empty';
                this.innerHTML = "No list set";
            } else {
                if (this.list.length > 5) {
                    this.mode = 'select';
                    this._asSelect();
                } else {
                    this.mode = 'radio';
                    this._asRadio();
                }
            }
            this.setAttribute('mode', this.mode);
        }

        _withStyle() {
            return `
                <style>
                    :host {
                        display: block;
                    }

                    #radio {
                        width: 100%;

                        display: flex;
                        flex-wrap: wrap;
                    }

                    #radio > span {
                        display: block;
                        width: 50%;
                    }

                    select {
                        width: 100%;
                    }
                </style>
            `
        }

        _asRadio() {
            let res = "<span id='radio'>";
            // TODO: set initial value
            for(let item of this.list) {
                let escaped = this._escape(item);
                res += `
                    <span to='${escaped}'>
                        <input type='radio' name ='radio_name_${this.uuid}' value='${escaped}' ${(this.value == item) ? "checked" : ""}>
                        <span>${item}</span>
                    <br>
                    </span>
                `
            }
            if (this.nullable) {
                res += `
                    <span to=''>
                        <input type='radio' name ='radio_name_${this.uuid}' value='' ${(this.value == "") ? "checked" : ""}>
                        <span>?</span>
                        <br>
                    </span>
                `;
            }
            res += "</span>";

            this.innerHTML = "<form>" + this._withStyle() + res + "</form>";
            this.querySelectorAll("span[to]").forEach((el) => {
                el.onclick = (event) => {
                    el.querySelector('input').setAttribute('checked', true);
                }
            });
        }

        _asSelect() {
            let res = "<select>\n";
            // TODO: set initial value
            for(let item of this.list) {
                let escaped = this._escape(item);
                res += `  <option name$='${escaped}' value='${escaped}' ${(this.value == item) ? "selected" : ""}>${item}</option>\n`;

            }
            if (this.nullable) {
                res += `  <option name='null' value='' ${(this.value == "") ? "selected" : ""}>?</option>\n`;
            }
            res += "</select>\n";

            // TODO: Register onclick
            this.innerHTML = this._withStyle() + res;
        }

        _escape(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        }

        getValue() {
            let value = null;
            switch(this.getAttribute("mode")) {
                case "select":
                    value = this.querySelector("select").value;
                    break;
                case "radio":
                    console.log("radio: ", this.querySelector("input[type=radio]:checked"));
                    value = this.querySelector("input[type=radio]:checked").value;
                    break;
            }
            if (value == "") {
                value = null;
            }
            return value;
        }
    }

    window.customElements.define('x-write-list', XWriteList);

    return XWriteList;
})();
