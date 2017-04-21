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
      this.authorizedList = [];
      this.shadowRoot = this.attachShadow({
        mode: 'open'
      });
    // }

    // connectedCallback() {
      // Create a shadow root

      this.shadowRoot.innerHTML = `
        <style>
          span.restricted {
            display: none;
          }
        </style>
        <span id='securized'>${this.innerHTML}</span>
        `;

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
        this.shadowRoot.querySelector("#securized").classList.remove("restricted");
        // this.shadowRoot.innerHTML = `<span id='securized'>${this.innerHTML}</span>`;
      } else {
        // this.shadowRoot.innerHTML = "<span>forbidden</span>";
        this.shadowRoot.querySelector("#securized").classList.add("restricted");;
      }
    }

  }

  window.customElements.define('jh-authorized-raw', JHAuthorized);

  return JHAuthorized;
}());
