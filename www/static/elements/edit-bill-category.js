
(function() {
    const tbody = Symbol["tbody"];
    const total = Symbol['total'];

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
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody></tbody>
                <tfooter>
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th id='total'></th>
                    </tr>
                </tfooter>
            </fieldset>`;
            this[tbody] = this.querySelector("tbody");
            this[total] = this.querySelector("#total");
        }

        adapt() {
            super.adapt();
            if (!this.priceLines) {
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
        }

        getTotal() {
            return Array.from(this.querySelectorAll("edit-bill-line")).reduce((acc, el) => {
                return acc + el.getTotal();
            }, 0);
        }

    }

    window.customElements.define('edit-bill-category', EditBillCategory);
})();
