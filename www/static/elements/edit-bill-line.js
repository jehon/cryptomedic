
(function() {
    const title = Symbol("title");
    const price = Symbol("price");
    const input = Symbol("input");
    const total = Symbol("total");

    class EditBillLine extends JHElement {
        constructor() {
            super();
            this.value = {
                Amount: 0
            };
            this.price = {
                title: 'Unknown',
                Amount: 1
            };
            this.Date = false;
        }

        static get properties() {
            return {
                value: "Object",
                price: "Object",
                Date: "String"
            }
        }

        render() {
            super.render();
            this.innerHTML = `
                <div style='display: table-cell' id='title'></div>
                <div style='display: table-cell' id='price'></div>
                <div style='display: table-cell'><input type='number' min=0 step=1 style='width: 4em' /></div>
                <div style='display: table-cell' id='total'></div>
            `;
            this[title] = this.querySelector("#title");
            this[price] = this.querySelector("#price");
            this[input] = this.querySelector("input");
            this[total] = this.querySelector("#total");

            this[input].addEventListener("change", () => {
                let tot = this.getTotal();
                this[total].innerHTML = tot;
                this.fire("change", tot);
            })
        }

        adapt() {
            super.adapt();
            this[title].innerHTML = this.price.title;
            this[price].innerHTML = this.price.Amount;
            if (this.value) {
                this[input].value = this.value.Amount;
            } else {
                this[input].value = 0;
            }
            this[total].innerHTML = this.getTotal();
        }

        getTotal() {
            let val = this[input].value;
            val = parseInt(val);
            return val * this.price.Amount;
        }

        getBillLine() {
            let val = this[input].value;
            val = parseInt(val);
            let res = {
                title: this.price.title,
                Amount: val,
            }
            if (this.value) {
                if (this.value.id)  {
                    res.id = this.value.id;
                }
                if (this.value.Date)  {
                    res.Date = this.value.Date;
                }
            }
            return res;
        }
    }

    window.customElements.define('edit-bill-line', EditBillLine);
})();
