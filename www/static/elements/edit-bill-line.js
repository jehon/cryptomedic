
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
        }

        static get properties() {
            return {
                value: "Object",
                price: "Object"
            }
        }

        render() {
            super.render();
            this.innerHTML = `<div style='display: table-row'>
                <div style='display: table-cell' id='title'></div>
                <div style='display: table-cell' id='price'></div>
                <div style='display: table-cell'><input type='integer' min=0 step=1 style='width: 4em' /></div>
            </div>`;
        }

        adapt() {
            super.adapt();
            this.querySelector('#title').innerHTML = this.price.title;
            this.querySelector('#price').innerHTML = this.price.Amount;
            this.querySelector('input').value = this.value.Amount;
        }
    }

    window.customElements.define('edit-bill-line', EditBillLine);
})();
