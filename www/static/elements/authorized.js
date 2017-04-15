let JHAuthorized = (function() {

  let authorizedListCB = jQuery.Callbacks();

  class JHAuthorized extends HTMLElement {
    // Object.keys(authorizedObject)
    static setAuthorizedList(authorizedList = []) {
      if (!authorizedList) {
        authorizedList = [];
      }
      authorizedListCB.fire(authorizedList);
    }

    constructor() {
      super();

      // Authorized list
      this.authorizedList = [];
      authorizedListCB.add((authorizedList) => {
        // Refresh the list and adapt()
        this.authorizedList = authorizedList;
        this.adapt();
      });

      // Create a shadow root
      this.attachShadow({
        mode: 'open'
      });
      this.adapt();
    }

    static get observedAttributes() {
      return ['value', 'inversed'];
    }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      this.adapt();
    }

    adapt() {
      // Text raw value
      let value = this.getAttribute("value");

      let inversed = this.hasAttribute("inversed");

      // XOR: thanks to http://www.howtocreate.co.uk/xor.html
      if (!(this.authorizedList.indexOf(value) >= 0) != !inversed) {
        this.shadowRoot.innerHTML = "<span id='securized'><slot name='securized'></slot></span>";
      } else {
        this.shadowRoot.innerHTML = "<span id='securized'><slot name='free'></slot></span>";
      }
    }

  }

  window.customElements.define('jh-authorized', JHAuthorized);

  return JHAuthorized;
}());
