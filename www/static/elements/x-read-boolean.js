
(function() {

    let selfURL = document.currentScript.src
      .replace(/\/[^/]*\/?$/, '');

    class XReadBoolean extends JHElement {
        static get properties() {
            return {
                "value": "Boolean"
            }
        }

        render() {
            super.render();

            // Create a shadow root
            this.attachShadow({mode: 'open'});
            this.shadowRoot.innerHTML = `
                <img>
              `;
        }

        adapt() {
            super.adapt();

            this.shadowRoot.querySelector('img').setAttribute('src', `${selfURL}/resources/boolean-${this._value ? 'true' : 'false'}.gif`)
        }
    }

    window.customElements.define('x-read-boolean', XReadBoolean);
})();
