
const XWaiting = (function() {
	const overlay = Symbol("overlay");
	const slot    = Symbol("slot");

    class XWaiting extends JHElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
            	<div id='overlay'>
            		<img src='elements/resources/waiting.gif' />Loading
            	</div>
            	<div id='slot'>
            		<slot></slot>
            	</div>`

            this[overlay] = this.shadowRoot.querySelector("#overlay");
            this[slot]    = this.shadowRoot.querySelector("#slot");
            this.free();
        }  

        block() {
            this[overlay].removeAttribute("hidden");
            this[slot].setAttribute("hidden", "hidden");
        }

        free() {
            this[overlay].setAttribute("hidden", "hidden");
            this[slot].removeAttribute("hidden");
        }

        isBlocked() {
            return !this[overlay].hasAttribute("hidden");
        }

        aroundPromise(p) {
            this.block();
            return p.then((data) => {
                this.free();
                return data;
            })
            .catch((error) => {
                this.free();
                throw error;
            })
        }
    }

    window.customElements.define('x-waiting', XWaiting);

    return XWaiting;
})();
