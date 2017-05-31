
let WriteList = (function() {

  let internalUUID=1;

  class WriteList extends HTMLElement {
    constructor() {
      super();
      // Create a shadow root
      this.attachShadow({ mode: 'open' });

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
          }

          #radio {
            width: 100%;

            display: flex;
            flex-wrap: wrap;
          }

          #radio > span {
            display: block;
            width: 50%;
          }

          select {
            width: 100%;
          }
        </style>       
      `
      this.id = "write-list-" + (internalUUID++);

      this.adapt();
    }

    static get observedAttributes() { return [ 'value', 'list', 'nullable' ]; }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      this.adapt();
    }


    adapt() {
      let value      = this.getAttribute("value");
      let list       = this.getAttribute("list");
      let nullable   = this.getAttribute("nullable");

      list     = JSON.parse(list);
      nullable = JSON.parse(nullable);

      if (!list || list.length <= 6) {
        this._asRadio(value, list, nullable);
      } else {
        this._asSelect(value, list, nullable);
      }
    }

    _asRadio(value, list, nullable) {

    }

    _asSelect(value, list, nullable) {

    }
  }

  window.customElements.define('write-list', WriteList);

  return WriteList;
})();

//   <style>
//     :host {
//       display: block;
//     }

//     #radio {
//       width: 100%;

//       display: flex;
//       flex-wrap: wrap;
//     }

//     #radio > span {
//       display: block;
//       width: 50%;
//     }

//     select {
//       width: 100%;
//     }
//   </style>

//   <template>
//     <form id='t'>
//       <template is='dom-if' if='[[!isSelect(list)]]'>
//         <span id='radio'>
//           <template is="dom-repeat" items="[[list]]">
//             <span on-tap='updateValueFromSpan' to='[[escape(item)]]'>
//               <input name='[[id]]' type='radio' on-change='updateValueFromRadio' value$='[[escape(item)]]' >
//                 <span>[[item]]</span>
//               <br>
//             </span>
//           </template>
//           <template is='dom-if' if='[[nullable]]'>
//             <span on-tap='updateValueFromSpan' to=''>
//               <input name='[[id]]' type='radio' on-change='updateValueFromRadio' null>
//               <span>?</span>
//             </span>
//           </template>
//         </span>
//       </template>
//       <template is='dom-if' if='[[isSelect(list)]]'>
//         <select id='select' on-change='updateValueFromSelect'>
//           <template is="dom-repeat" items="[[list]]">
//             <option name$='[[escape(item)]]' value='[[escape(item)]]'>[[item]]</option>
//           </template>
//           <template is='dom-if' if='[[nullable]]'>
//             <option name$='[[escape(item)]]' value='' null>?</option>
//           </template>
//         </select>
//       </template>
//     </form>
//   </template>

//   <script>
//     (function() {
//         // https://www.polymer-project.org/1.0/docs/devguide/properties
//         properties: {
//           mode: {
//             type:               String,
//             value:              "radio",
//             notify:             true,
//             readOnly:           true,
//             reflectToAttribute: true
//           }
//         },

//         escape(str) {
//           if (str == null) {
//             return '';
//           }
//           return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
//         },

//         // Handle value update

//         updateValue() {
//           // Readonly could only be set like this: https://www.polymer-project.org/1.0/docs/devguide/properties#read-only
//           this._setMode(this.isSelect(this.list) ? "select" : "radio");
//           if (this.value == '') {
//             this.value = null;
//             return;
//           }

//           if (this.value == 'null') {
//             this.value = null;
//             return;
//           }

//           Polymer.dom.flush();
//           let s = this.$$('select')
//           if (s) {
//             if (this.value == null) {
//               s.value = '';
//             } else {
//               s.value = this.value;
//             }
//           }

//           let r;
//           if (this.value == null) {
//             r = this.$$('input[type=radio][null]');
//           } else {
//             r = this.$$('input[type=radio][value="' + this.escape(this.value) + '"]');
//           }
//           if (r) {
//             r.setAttribute('checked', true);
//           }
//           Polymer.dom.flush();
//         },

//         // SELECT
//         updateValueFromSelect() {
//           this.value = this.$$('select').value;
//         },

//         // RADIO
//         updateValueFromRadio() {
//           this.value = this.$$('input[type=radio]:checked').value;
//         },

//         // RADIO SPAN AROUND
//         updateValueFromSpan(event) {
//           this.value = event.currentTarget.to;
//         },
