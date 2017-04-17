let JHAuthorized = (function() {

  let authorizedListCB = jQuery.Callbacks("memory");

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

      // Create a shadow root
      this.sr = this.attachShadow({
        mode: 'open'
      });

      this.authorizedList = [];
      authorizedListCB.add((authorizedList) => {
        // Refresh the list and adapt()
        this.authorizedList = authorizedList;
        this.adapt();
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
        this.sr.innerHTML = `<span id='securized'>${this.innerHTML}</span>`;
      } else {
        this.sr.innerHTML = "<span>forbidden</span>";
      }
    }

  }

  window.customElements.define('jh-authorized', JHAuthorized);

  return JHAuthorized;
}());
