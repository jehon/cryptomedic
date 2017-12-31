(function() {
    const overlay = Symbol("overlay");

    class XWaiting extends JHElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
            <style>
                [hidden] { 
                    display: none !important;
                }

                #overlay {
                    position: absolute;
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%; 
                    background: lightgray; 
                    display: flex; 
                    flex-direction: row; 
                    align-items: center; 
                    justify-content: center;
                }
            </style>
            <div style='position: relative'>
                <div id='overlay'>
                    <img src='elements/resources/waiting.gif'/>
                </div>
                <slot></slot>
            </div>`;
            this[overlay] = this.shadowRoot.querySelector("#overlay");
            this.hide();
        }  

        show() {
            this[overlay].removeAttribute("hidden");
        }

        hide() {
            this[overlay].setAttribute("hidden", "hidden");
        }

        isShown() {
            return !this[overlay].hasAttribute("hidden");
        }

        aroundPromise(p) {
            this.show();
            return p.then((data) => {
                this.hide();
                return data;
            })
            .catch((error) => {
                this.hide();
                throw error;
            })
        }
    }

    window.customElements.define('x-waiting', XWaiting);
})();
