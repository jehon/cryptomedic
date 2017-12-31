
const XWaitingValueObject = (function() {
    class XWaitingValueObject extends XWaiting {
        static get properties() {
            return {
                value: "Object"
            }
        }

        constructor() {
            super();
            this.block();
        }

        onValueChanged(v) {
            if (v === null) {
                this.block();
            } else {
                this.free();
            }
        }
    }

    window.customElements.define('x-waiting-value-object', XWaitingValueObject);

    return XWaitingValueObject;
})();
