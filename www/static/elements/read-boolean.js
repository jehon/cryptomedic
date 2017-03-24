
let selfURL = document.currentScript.src
    .replace(/\/[^/]*\/?$/, '');

class ReadBoolean extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
        <span>read-boolean+</span>
        <img>
        <span>read-boolean-</span>
      `;
    this.adapt();
  }

  static get observedAttributes() { return ['value']; }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    console.log("attributeChangedCallback", attributeName, newValue);
    if (attributeName == 'value') {
      this.adapt();
    }
  }

  adapt() {
    let val = JSON.parse(this.getAttribute("value"));
    this.shadowRoot.querySelector('img').setAttribute('src', `${selfURL}/resources/boolean-${val?'true':'false'}.gif`)
  }

}

window.customElements.define('read-boolean', ReadBoolean);
