// TODO: rewrite this as a subset of x-overlay with image insert
//    and relative to the content

const XWaiting = (function() {
    class XWaiting extends JHElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                }

                #overlay[hidden] {
                    display: none !important;
                }

                #overlay {
                    position: absolute;
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%; 

                    display: flex; 
                    flex-direction: row; 
                    align-items: center; 
                    justify-content: center;

                    background-color: rgba(0, 0, 0, 0.9); /* Black w/opacity */
                    overflow-x: hidden;
                    transition: 0.5s;
                }
            </style>
            <div id='overlay'>
                <img src='elements/resources/waiting.gif'/>
                <slot></slot>
            </div>
            `;
            this.free();
        }  

        block() {
            this.shadowRoot.querySelector("#overlay").removeAttribute("hidden");
        }

        free() {
            this.shadowRoot.querySelector("#overlay").setAttribute("hidden", "hidden");
        }

        isBlocked() {
            return !this.shadowRoot.querySelector("#overlay").hasAttribute("hidden");
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
