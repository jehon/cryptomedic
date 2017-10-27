
(function() {
    const tbody = Symbol["tbody"];
    const total = Symbol['total'];

    class EditBillCategory extends JHElement {
        constructor() {
            super();
            this.value = {
                Amount: 0
            };
            this.priceLines = {
                title: 'Unknown',
                Amount: 1
            };
            this.date = false;
        }

        static get properties() {
            return {
                bill: "Object",
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
                    this[tbody].appendChild(this.createElementFromString(`<edit-bill-line style='display: table-row' price='${JSON.stringify(p)}'></edit-bill-line>`));
                }
            })
        }

    }

    window.customElements.define('edit-bill-category', EditBillCategory);
})();
