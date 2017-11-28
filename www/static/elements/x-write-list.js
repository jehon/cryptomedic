
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

        render() {
            this.attachShadow({ mode: 'open' }); // this.shadowRoot
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
                this.shadowRoot.innerHTML = "X-Write-List: no list set";
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
                        <input type='radio' name='x-write-list-radio-${uuid}' value='${escaped}' ${(this.value == item) ? "checked" : ""}>
                        <span>${item}</span>
                    <br>
                    </span>
                `
            }
            if (this.nullable) {
                res += `
                    <span to=''>
                        <input type='radio' name='x-write-list-radio-${uuid}' value='' ${(this.value == "") ? "checked" : ""}>
                        <span>?</span>
                        <br>
                    </span>
                `;
            }
            res += "</span>";

            this.shadowRoot.innerHTML = "<form>" + this._withStyle() + res + "</form>";
            this.shadowRoot.querySelectorAll('input').forEach(el => {
                el.addEventListener('change', () => {
                    this.fire("change", 0);
                })
            })
            this.shadowRoot.querySelectorAll("span[to]").forEach(el => {
                el.onclick = (event) => {
                    el.querySelector('input').setAttribute('checked', true);
                    this.fire("change", el.querySelector('input').getAttribute('value'));
                }
            });
            if (this.shadowRoot.querySelector("input[type=radio]:checked") == null) {
                // If value is null or not set:
                // - if we are nullable -> correct value (null) is already set
                // - other wise, let's pick up the first one
                this.shadowRoot.querySelector("input[type=radio]").setAttribute("checked", "checked");
            }
        }

        _asSelect() {
            let res = "<select>\n";
            if (this.nullable) {
                res += `  <option value='' ${(this.value == "") ? "selected" : ""}>?</option>\n`;
            }
            for(let item of this.list) {
                let escaped = this._escape(item);
                res += `  <option value='${escaped}' ${(this.value == item) ? "selected" : ""}>${item}</option>\n`;

            }
            res += "</select>\n";

            this.shadowRoot.innerHTML = this._withStyle() + res;

            this.shadowRoot.querySelector("select").addEventListener("change", el => {
                this.fire("change", 0);
            });
        }

        _escape(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        }

        getValue() {
            let value = null;
            switch(this.getAttribute("mode")) {
                case "select":
                    value = this.shadowRoot.querySelector("select").value;
                    break;
                case "radio":
                    value = this.shadowRoot.querySelector("input[type=radio]:checked").value;
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
