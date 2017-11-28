
(function() {
    const title = Symbol("title");
    const price = Symbol("price");
    const input = Symbol("input");
    const total = Symbol("total");

    class BlockBillLine extends JHElement {
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
                Date:  "String",
                edit:  "Boolean"
            }
        }

        render() {
            super.render();
            this.createElementAndAddThem(`
                <div style='display: table-cell' id='title'></div>
                <div style='display: table-cell'><x-inline ${this.edit ? 'edit=1' : '' } type='numeric' name='price' value='0' inline='min=0 step=1 style="width: 4em" '></x-inline></div>
                <div style='display: table-cell' id='price'></div>
                <div style='display: table-cell' id='total'></div>
            `);
            this[title] = this.querySelector("#title");
            this[price] = this.querySelector("#price");
            this[input] = this.querySelector("x-inline");
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
            if (this.value && typeof(this.value) == 'object' && isFinite(this.value.Amount)) {
                this[input].setAttribute("value", this.value.Amount);
                this[total].innerHTML = this.getTotal();
            } else {
                this[input].setAttribute("value", 0);
                this[total].innerHTML = 0;
            }
        }

        getTotal() {
            let val = this[input].getValue();
            val = parseInt(val);
            return val * this.price.Amount;
        }

        getBillLine() {
            let val = this[input].getValue();
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

    window.customElements.define('block-bill-line', BlockBillLine);
})();
