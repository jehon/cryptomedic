
(function() {
    const tbody = Symbol("tbody");
    const catTotal = Symbol('catTotal');
    const legend = Symbol('legend');

    class BlockBillCategory extends JHElement {
        constructor() {
            super();
            this.value = [];
            this.priceLines = [];
            this.date = false;
        }

        static get properties() {
            return {
                value:      "Object",
                priceLines: "Object",
                category:   "String",
                edit:       "Boolean"
            }
        }

        render() {
            super.render();
            this.innerHTML = `<fieldset>
                <legend>default legend</legend>
                <table class='prices'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>catTotal</th>
                  </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                    <tr>
                        <th>sub-total</th>
                        <th></th>
                        <th></th>
                        <th id='catTotal'></th>
                    </tr>
                </tfoot>
            </fieldset>`;
            this[tbody] = this.querySelector("tbody");
            this[catTotal] = this.querySelector("#catTotal");
            this[legend] = this.querySelector("legend");
        }

        adapt() {
            super.adapt();
            if (!this.priceLines || this.priceLines.length < 1) {
                return;
            }
            this.removeAttribute("hidden");

            this[tbody].innerHTML = "";
            this[legend].innerHTML = this.category
            let displayed = false;
            this.priceLines.forEach((p) => {
                if (p.type == this.category) {
                    let v = 0;
                    if (this.value) {
                        v = this.value.reduce((acc, v) => {
                            return acc || (v.title == p.title ? v : false);
                        }, false);
                    }
                    if (v.Amount || this.edit) {
                        this[tbody].appendChild(this.createElementAndAddThem(`<block-bill-line ${this.edit ? 'edit' : '' } style='display: table-row' value='${JSON.stringify(v)}' price='${JSON.stringify(p)}'></block-bill-line>`, 
                        null)[0]);
                        displayed = true;
                    }
                }
            })
            this.querySelectorAll("block-bill-line").forEach(el => el.addEventListener("change", () => this._adaptTotal()));
            this._adaptTotal();
            if (!displayed) {
                this.setAttribute("hidden", "empty-edit")
            }
        }

        getTotal() {
            return Array.from(this.querySelectorAll("block-bill-line")).reduce((acc, el) => {
                return acc + el.getTotal();
            }, 0);
        }

        _adaptTotal() {
            this[catTotal].innerHTML = this.getTotal();
        }

        getBillLines() {
            return Array.from(this.querySelectorAll("block-bill-line")).map(x => x.getBillLine()).filter(x => (x.Amount > 0));
        }
    }

    window.customElements.define('block-bill-category', BlockBillCategory);
})();
