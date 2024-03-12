/* istanbul ignore file */

/*
  TODO:
  - annotation -> register element
  - template   -> externalize ?
*/

const initialized = Symbol("initialized");

export default class JHElement extends HTMLElement {
  static get observedAttributes() {
    if (this.properties) {
      return Object.keys(this.properties).map((k) => JHElement.camelToSnake(k));
    }
    return [];
  }

  static fireOn(target, name, data = {}) {
    var event = new CustomEvent(name, { detail: data });
    target.dispatchEvent(event);
  }

  static canonizeBoolean(v) {
    if (v == null) {
      return false;
    }
    if (v === "false") {
      return false;
    }
    if (v === "0" || v === 0) {
      return false;
    }
    // TODO:
    // if (v == '') {
    //     return false;
    // }
    return true;
  }

  static snakeToCamel(s) {
    let res = s.replace(/(-\w)/g, function (m) {
      return m[1].toUpperCase();
    });
    return res[0].toLowerCase() + res.substring(1);
  }

  static camelToSnake(s) {
    let res = s.replace(/([A-Z])/g, function (m) {
      return "-" + m[0].toLowerCase();
    });
    return res;
  }

  static withInitialUpper(s) {
    return s[0].toUpperCase() + s.substring(1);
  }

  static defaultValue(type) {
    switch (type) {
      case "Boolean":
        return false;
      case "Object":
        return null;
      case "Integer":
        return 0;
    }
    return "";
  }

  constructor() {
    super();
    this[initialized] = false;

    if (this.constructor.properties) {
      Object.keys(this.constructor.properties).forEach((k) => {
        const ki = "_" + k;
        this[ki] = JHElement.defaultValue(this.constructor.properties[k]);
        if (!(k in this)) {
          Object.defineProperty(this, k, {
            get: () => this[ki],
            set: (v) => {
              this.attributeChangedCallback(
                JHElement.camelToSnake(k),
                this[ki],
                v
              );
            }
          });
        }
      });
    }
  }

  isInitialized() {
    return this[initialized];
  }

  inheritCSS() {
    if (
      typeof window.ShadyDOM == "object" &&
      window.ShadyDOM != null &&
      window.ShadyDOM.inUse
    ) {
      return;
    }
    document.querySelectorAll("style, link").forEach((el) => {
      const node = el.cloneNode(true);
      this.shadowRoot.append(node);
    });
  }

  attributeChangedCallback(attributeName, _oldValue, newValue) {
    // snake-case to camel-case
    const attributeNameCamel = JHElement.snakeToCamel(attributeName);
    const attributeNameInternal = "_" + attributeNameCamel;

    let props = this.constructor.properties;
    if (props && props[attributeNameCamel]) {
      if (newValue === "null" || newValue === "undefined") {
        this[attributeNameInternal] = JHElement.defaultValue(
          props[attributeNameCamel]
        );
      } else {
        switch (props[attributeNameCamel]) {
          case "Boolean":
            this[attributeNameInternal] = JHElement.canonizeBoolean(newValue);
            break;
          case "Object":
            if (typeof newValue == "string") {
              try {
                this[attributeNameInternal] = JSON.parse(newValue);
              } catch (_e) {
                this[attributeNameInternal] = null;
              }
            } else {
              this[attributeNameInternal] = newValue;
            }
            break;
          case "Integer":
            this[attributeNameInternal] = Number.parseFloat(newValue);
            if (isNaN(this[attributeNameInternal])) {
              this[attributeNameInternal] = JHElement.defaultValue(
                props[attributeNameCamel]
              );
            }
            break;
          default:
            this[attributeNameInternal] = newValue;
        }
      }
    } else {
      // Could happen if one element override the getAttributes...
      if (newValue == "null" || newValue == "undefined") {
        this[attributeNameInternal] = JHElement.defaultValue();
      } else {
        this[attributeNameInternal] = newValue;
      }
    }
    if (this.isInitialized()) {
      // onValueChanged(new value);
      const cb =
        "on" + JHElement.withInitialUpper(attributeNameCamel) + "Changed";
      if (typeof this[cb] == "function") {
        this[cb](this[attributeNameInternal]);
      }
      this.adapt();
    }
  }

  connectedCallback() {
    if (!this.isInitialized()) {
      // Comomn render functions
      // here to avoid calling "super" everywhere in all render()
      this[initialized] = true;

      // We have to set it to be "inline-block" to have some dimensions for "formGetContent"
      if (!this.style.display) {
        this.style.display = "inline-block";
      }

      this.render();
    }
    this.adapt();
  }

  render() {}

  adapt() {}

  fire(name, data = {}) {
    JHElement.fireOn(this, name, data);
  }

  createElementAndAddThem(html, to = this) {
    // TODO: insertAdjacentHTML ?
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    var template = document.createElement("template");
    template.innerHTML = html.trim();

    if (to != null) {
      to.innerHTML = "";
      template.content.childNodes.forEach((el) => to.append(el));
    }
    return template.content.childNodes;
  }
}

window.customElements.define("jh-element", JHElement);
