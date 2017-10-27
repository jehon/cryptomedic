
(function() {
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
            this.innerHTML = "";
            //this.appendChild(this.createElementFromString(`
            this.innerHTML = `
                <div style='display: table-cell' id='title'></div>
                <div style='display: table-cell' id='price'></div>
                <div style='display: table-cell'><input type='integer' min=0 step=1 style='width: 4em' /></div>
            `;
        }

        adapt() {
            super.adapt();
            this.querySelector('#title').innerHTML = this.price.title;
            this.querySelector('#price').innerHTML = this.price.Amount;
            this.querySelector('input').value = this.value.Amount;
        }

        getTotal() {
            let val = this.querySelector("input").value;
            val = parseInt(val);
            return val * this.price.Amount;
        }

        getBillLine() {
            let val = this.querySelector("input").value;
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
