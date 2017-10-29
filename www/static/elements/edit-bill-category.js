
(function() {
    const tbody = Symbol("tbody");
    const catTotal = Symbol('catTotal');

    class EditBillCategory extends JHElement {
        constructor() {
            super();
            this.value = [];
            this.priceLines = [];
            this.date = false;
        }

        static get properties() {
            return {
                value: "Object",
                priceLines: "Object",
                category: "String"
            }
        }

        render() {
            super.render();
            this.innerHTML = `<fieldset>
                <legend></legend>
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
                        <th>catTotal</th>
                        <th></th>
                        <th></th>
                        <th id='catTotal'></th>
                    </tr>
                </tfoot>
            </fieldset>`;
            this[tbody] = this.querySelector("tbody");
            this[catTotal] = this.querySelector("#catTotal");
        }

        adapt() {
            super.adapt();
            if (!this.priceLines || this.priceLines.length < 1) {
                return;
            }
            this[tbody].innerHTML = "";
            this.priceLines.forEach((p) => {
                if (p.category == this.category) {
                    let v = this.value.reduce((acc, v) => {
                        return acc || (v.title == p.title ? v : false);
                    }, false);
                    this[tbody].appendChild(
                        this.createElementFromString(`<edit-bill-line style='display: table-row' value='${JSON.stringify(v)}' price='${JSON.stringify(p)}'></edit-bill-line>`)
                    );
                }
            })
            this.querySelectorAll("edit-bill-line").forEach(el => el.addEventListener("change", () => this._adaptTotal()));
            this._adaptTotal();
        }

        getTotal() {
            return Array.from(this.querySelectorAll("edit-bill-line")).reduce((acc, el) => {
                return acc + el.getTotal();
            }, 0);
        }

        _adaptTotal() {
            this[catTotal].innerHTML = this.getTotal();
        }

    }

    window.customElements.define('edit-bill-category', EditBillCategory);
})();
