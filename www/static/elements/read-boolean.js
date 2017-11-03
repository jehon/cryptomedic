
let ReadBoolean = (function() {

    let selfURL = document.currentScript.src
      .replace(/\/[^/]*\/?$/, '');

    class ReadBoolean extends HTMLElement {
        constructor() {
            super();

            // Create a shadow root
            this.attachShadow({mode: 'open'});
            this.shadowRoot.innerHTML = `
                <img>
              `;
            this.adapt();
        }

        static get observedAttributes() { return ['value']; }

        attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
            this.adapt();
        }

        adapt() {
            let raw = this.getAttribute("value");
            let val = "";
            try {
                val = JSON.parse(raw);
            } catch(e) { // SyntaxError
                val = raw;
            }
            this.shadowRoot.querySelector('img').setAttribute('src', `${selfURL}/resources/boolean-${val?'true':'false'}.gif`)
        }

    }

    window.customElements.define('read-boolean', ReadBoolean);

    return ReadBoolean;
})();
