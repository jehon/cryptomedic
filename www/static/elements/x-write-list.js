
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
            this._mode = false;
            this.references = {};

            this._uuid = uuid++;

            referencesCB.add((references) => {
                this.references = references;
                if (this.isInitialized()) {
                    this.onListNameChanged(this._listName);
                }
            });
        }

        render() {
            super.render();
            this.attachShadow({ mode: 'open' });
            this.createList();
            this.onValueChanged(this._value);
        }

        onValueChanged(v) {
            const escaped = this._escape(v);
            let el;
            switch(this.getAttribute("mode")) {
                case "select":
                    el = this.shadowRoot.querySelector("select");
                    if (el == null) {
                        return;
                    }
                    el.value = escaped;
                    break;
                case "radio":
                    el = this.shadowRoot.querySelector(`input[type=radio][value='${escaped}']`);
                    if (el == null) {
                        return;
                    }
                    el.setAttribute('checked', 'checked');
                    break;
            }
        }

        onListChanged(v) {
            this.createList();
            this.onValueChanged(this._value);
        }

        onListNameChanged(v) {
            this.createList();
            this.onValueChanged(this._value);
        }

        createList() {
            if (this._listName) {
                if (typeof(this.references[this._listName]) == 'undefined') {
                  this._list = [];
                } else {
                  this._list = this.references[this._listName];  
                }       
            }
            if (!this._list) {
                this._list = [];
            }
            if (this._list.length == 0) {
                this._mode = 'empty';
                this.shadowRoot.innerHTML = "X-Write-List: no list set";
            } else {
                if (this._list.length > 5) {
                    this._mode = 'select';
                    this._asSelect();
                } else {
                    this._mode = 'radio';
                    this._asRadio();
                }
            }
            this.setAttribute('mode', this._mode);
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
            for(let item of this._list) {
                let escaped = this._escape(item);
                res += `
                    <span to='${escaped}'>
                        <input type='radio' name='x-write-list-radio-${uuid}' value='${escaped}'>
                        <span>${item}</span>
                    <br>
                    </span>
                `
            }
            if (this._nullable) {
                res += `
                    <span to=''>
                        <input type='radio' name='x-write-list-radio-${uuid}' value=''>
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
            // if (this.shadowRoot.querySelector("input[type=radio]:checked") == null) {
            //     // If value is null or not set:
            //     // - if we are nullable -> correct value (null) is already set
            //     // - other wise, let's pick up the first one
            //     this.shadowRoot.querySelector("input[type=radio]").setAttribute("checked", "checked");
            // }
        }

        _asSelect() {
            let res = "<select>\n";
            if (this._nullable) {
                res += `  <option value=''>?</option>\n`;
            }
            for(let item of this._list) {
                let escaped = this._escape(item);
                res += `  <option value='${escaped}'>${item}</option>\n`;

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

        set value(v) {
            this._value = v;
        }

        get value() {
            let value = null;
            switch(this.getAttribute("mode")) {
                case "select":
                    value = this.shadowRoot.querySelector("select").value;
                    break;
                case "radio":
                    const checked = this.shadowRoot.querySelector("input[type=radio]:checked");
                    if (checked == null) {
                        value = null;
                    } else {
                        value = checked.value;
                    }
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
