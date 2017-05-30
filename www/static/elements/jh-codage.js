
let JHCodage = (function() {
  class JHCodage extends HTMLElement {
    constructor() {
      super();

      // Create a shadow root
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
        `;
      this.adapt();
    }

    static get observedAttributes() { return [ 'value', 'translated' ]; }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      if (attributeName == 'value' || attributeName == 'translated') {
        this.adapt();
      }
    }


    adapt() {
      console.log("adapt me");
      let value      = this.getAttribute("value");
      let translated = this.getAttribute("translated");
    }
  }

  window.customElements.define('jh-codage', JHCodage);

  return JHCodage;
})();

// <link rel="import" href="../../bower_components/polymer/polymer.html">

// <dom-module name="jh-codage">
//   <template>
//     <span id='translating' hidden$="[[!getTranslated(value, translated)]]" data-toggle='tooltip' data-placement='bottom' title='[[value]]'>
//       <span id='translated'>[[getTranslated(value, translated)]]</span>*
//     </span>
//     <span id='original'   hidden$="[[getTranslated(value, translated)]]">[[value]]</span>
//   </template>

//   <script>
//     Polymer({
//       is: 'jh-codage',

//       // https://www.polymer-project.org/1.0/docs/devguide/properties
//       properties: {
//         value: {
//           type:               String,
//           value:              ""
//         },
//         translated: {
//           type:               String,
//           value:              ""
//         }
//       },

//       getTranslated(value, translated) {
//         if (translated) {
//           return translated;
//         }
//         if (!cryptomedic) {
//           return false;
//         }
//         if (!cryptomedic.serverSettings) {
//           return false;
//         }

//         let settings = cryptomedic.serverSettings;
//         if (!settings.codes) {
//           return false;
//         }

//         if (!settings.codes[value]) {
//           return false;
//         }

//         return settings.codes[value];
//       }
//     });
//   </script>
// </dom-module>
