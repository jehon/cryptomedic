import { webDescribe } from "./athelpers.js";

import JHElement from "../../../legacy/app-old/v1/elements/jh-element.js";

describe("jh-element-test", function () {
  // Instanciate a real element to test properties...
  class JHElementTest extends JHElement {
    static get properties() {
      return {
        sVal: "String",
        sInt: "Integer",
        sObj: "Object",
        sBool: "Boolean",
        linkedValue: "String"
      };
    }

    onSValChanged() {
      if (!this.sValChanged) {
        this.sValChanged = 0;
      }
      this.sValChanged++;
    }

    get linkedValue() {
      return this["_sVal"];
    }

    set linkedValue(v) {
      this["_sVal"] = v;
    }
  }
  window.customElements.define("jh-element-test", JHElementTest);

  beforeEach(function () {
    spyOn(JHElement.prototype, "render").and.callThrough();
    spyOn(JHElement.prototype, "adapt").and.callThrough();
  });

  it("should do nothing without being attached", function () {
    let jhelement = new JHElement();
    let element = () => jhelement;

    expect(JHElement.prototype.render).toHaveBeenCalledTimes(0);
    expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(0);

    element().setAttribute("s-val", 1);
    expect(JHElement.prototype.render).toHaveBeenCalledTimes(0);
    expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(0);

    element().connectedCallback();
    expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
    expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(1);

    // Should not initialize further
    element().connectedCallback();
    expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
    expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(2);
  });

  it("should handle css", function () {
    if (!document.querySelector("style")) {
      const styles = document.createElement("style");
      styles.setAttribute("for", "jh-element-test");
      document
        .querySelector("body")
        .insertAdjacentElement("afterbegin", styles);
    }

    let jhelement = new JHElement();
    let element = () => jhelement;

    const init = window.ShadyDOM;
    window.ShadyDOM = {
      inUse: true
    };
    element().inheritCSS();
    element().attachShadow({ mode: "open" });
    expect(element().shadowRoot.innerHTML).not.toContain("<style ");
    expect(element().shadowRoot.innerHTML).not.toContain("<link ");

    window.ShadyDOM.inUse = false;
    element().inheritCSS();
    expect(element().shadowRoot.innerHTML).toContain("<style ");
    expect(element().shadowRoot.innerHTML).toContain("<link ");

    window.ShadyDOM = null;
    element().inheritCSS();
    expect(element().shadowRoot.innerHTML).toContain("<style ");
    expect(element().shadowRoot.innerHTML).toContain("<link ");

    delete window.ShadyDOM;
    element().inheritCSS();
    expect(element().shadowRoot.innerHTML).toContain("<style ");
    expect(element().shadowRoot.innerHTML).toContain("<link ");

    window.ShadyDOM = init;
  });

  it("should handle attributes by default", function () {
    let jhelement = new JHElement();
    let element = () => jhelement;

    expect(element().constructor.observedAttributes).toEqual([]);
    element().attributeChangedCallback("s-val", "", "123");
    expect(typeof element()._sVal).toBe("string");
    expect(element()._sVal).toBe("123");
    expect(element()._sVal).not.toBe(123);
  });

  it("should parse attributes correctly", function () {
    let jhelement = new JHElementTest();
    let element = () => jhelement;

    expect(element()._sVal).toBe("");
    expect(element()._sInt).toBe(0);
    expect(element()._sObj).toBe(null);
    expect(element()._sBool).toBe(false);

    expect(element().constructor.observedAttributes).toEqual([
      "s-val",
      "s-int",
      "s-obj",
      "s-bool",
      "linked-value"
    ]);

    element().attributeChangedCallback("s-val", "", "123");
    expect(typeof element()._sVal).toBe("string");
    expect(element()._sVal).toBe("123");
    expect(element()._sVal).not.toBe(123);

    element().attributeChangedCallback("s-int", "", "123");
    expect(typeof element()._sInt).toBe("number");
    expect(element()._sInt).toBe(123);
    expect(element()._sInt).not.toBe("123");

    element().attributeChangedCallback("s-int", "", "123.5");
    expect(typeof element()._sInt).toBe("number");
    expect(element()._sInt).toBe(123.5);
    expect(element()._sInt).not.toBe("123.5");

    element().attributeChangedCallback("s-obj", "", JSON.stringify({ a: 1 }));
    expect(typeof element()._sObj).toBe("object");
    expect(element()._sObj).toEqual({ a: 1 });

    element().attributeChangedCallback("s-obj", "", "{a:}");
    expect(typeof element()._sObj).toBe("object");
    expect(element()._sObj).toEqual(null);

    element().attributeChangedCallback("s-bool", "", "");
    expect(typeof element()._sBool).toBe("boolean");
    expect(element()._sBool).toBeTruthy();

    element().attributeChangedCallback("s-bool", "", "false");
    expect(typeof element()._sBool).toBe("boolean");
    expect(element()._sBool).toBeFalsy();

    element().attributeChangedCallback("s-bool", "", "0");
    expect(typeof element()._sBool).toBe("boolean");
    expect(element()._sBool).toBeFalsy();

    element().attributeChangedCallback("s-bool", "", null);
    expect(typeof element()._sBool).toBe("boolean");
    expect(element()._sBool).toBeFalsy();
  });

  it("should handle properties", function () {
    let jhelement = new JHElementTest();
    let element = () => jhelement;

    element().sVal = "a15";
    expect(element().sVal).toBe("a15");

    element().sInt = 15;
    expect(element().sInt).toBe(15);

    element().sObj = { a: 15 };
    expect(element().sObj).toEqual({ a: 15 });

    element().sBool = true;
    expect(element().sBool).toBe(true);
  });

  webDescribe(
    "without parameter",
    "<jh-element></jh-element>",
    function (element) {
      it("should instanciate empty", function (done) {
        expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(1);

        // We dont' listen to this, so it does make nothing...
        element().setAttribute("s-val", 1);
        expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(1);

        done();
      });

      it("should createElementAndAddThem", function () {
        element().createElementAndAddThem(
          "<div>test<span>subcontent</span></div>"
        );
        let el = element().firstChild;
        expect(el.tagName).toBe("DIV");
        expect(el.textContent).toContain("test");
        expect(el.textContent).toContain("subcontent");

        expect(el.querySelector("span")).not.toBeNull();
        expect(el.querySelector("span").innerHTML).toBe("subcontent");
      });

      it("should createElementAndAddThem to not existing target", function () {
        element().createElementAndAddThem(
          "<div id='anything'>anything</div>",
          null
        );
        expect(element().querySelector("#anything")).toBeNull();
      });

      it("should manage events", function () {
        let res = {};
        element().addEventListener("blur", (event) => {
          res = event.detail;
        });

        expect(res).toEqual({});

        element().fire("anything", 123);
        expect(res).toEqual({});

        element().fire("blur", 123);
        expect(res).toEqual(123);
      });

      it("should manage undefined property as string", function () {
        expect(element().anything).toBeUndefined();
        element().attributeChangedCallback("anything", "", "123");
        expect(element()._anything).toBe("123");

        element().attributeChangedCallback("anything", "", "undefined");
        expect(element()._anything).toBe("");
      });
    }
  );

  it("shoudl not be initialized when created without rendering", function () {
    const el = new JHElementTest();
    expect(el.isInitialized()).toBeFalsy();
  });

  webDescribe(
    "with some parameters",
    "<jh-element-test s-val='null' s-obj='null'></jh-element-test>",
    function (element) {
      it("should have a null s-val", function () {
        expect(element()._sVal).toBe("");
        expect(element()._sObj).toEqual(null);

        expect(element().sVal).toBe("");
        expect(element().sObj).toEqual(null);
      });

      it("should handle custom setter/getter", function () {
        element().sVal = "original";
        expect(element()._sVal).toBe("original");

        element().linkedValue = "linked";
        expect(element().linkedValue).toBe("linked");
        expect(element().sVal).toBe("linked");
      });
    }
  );

  webDescribe(
    "with invalid integer value",
    "<jh-element-test s-int='abc'></jh-element-test>",
    function (element) {
      it("should have default 0", function () {
        expect(element()._sInt).toBe(0);
        expect(element().sInt).toBe(0);
      });

      it("should handle custom setter/getter", function () {
        element().sInt = "def";
        expect(element()._sInt).toBe(0);
      });
    }
  );

  webDescribe(
    "with specific handler",
    "<jh-element-test s-val='123' value='abc'></jh-element-test>",
    function (element) {
      it("should handle specific handler (onSValChanged)", function () {
        expect(element()._sVal).toBe("123");
        expect(element().sVal).toBe("123");

        // Changes generated before the first render does not trigger the onSValChanged()
        expect(element().sValChanged).toBeUndefined();
        element().setAttribute("s-val", "456");
        expect(element()._sVal).toBe("456");
        expect(element().sValChanged).toBe(1);
      });

      it("should handle values without custom event listener (onBoolChanged)", function () {
        element().setAttribute("s-bool", "true");
        expect(element()._sBool).toBe(true);
        expect(element().sBool).toBe(true);

        element().setAttribute("s-bool", "false");
        expect(element()._sBool).toBe(false);
        expect(element().sBool).toBe(false);

        element().setAttribute("s-bool", "");
        expect(element()._sBool).toBe(true);
        expect(element().sBool).toBe(true);

        element().removeAttribute("s-bool", "");
        expect(element()._sBool).toBe(false);
        expect(element().sBool).toBe(false);
      });
    }
  );

  webDescribe(
    "with style already diplayed",
    "<jh-element style='display: inline'></jh-element>",
    function (element) {
      it("should handle specific handler (onSValChanged)", function () {
        expect(element().style.display).toBe("inline");
      });
    }
  );
});
