
describe("jh-element-test", function() {
    // Instanciate a real element to test properties...
    class JHElementTest extends JHElement {
        static get properties() {
            return {
                sVal:     "String",
                sInt:     "Integer",
                sObj:     "Object",
                sBool:    "Boolean",
                value:    "String"
            }
        }

        onValueChanged() {
            if (!this.valueChanged) {
                this.valueChanged = 0;
            }
            this.valueChanged++;
        }
    }
    window.customElements.define('jh-element-test', JHElementTest);

    beforeEach(function() {
        spyOn(JHElement.prototype, 'render').and.callThrough();
        spyOn(JHElement.prototype, 'adapt').and.callThrough();
    })

    it("should do nothing without being attached", function() {
        let jhelement = new JHElement();
        let element = () => jhelement;

        expect(JHElement.prototype.render).toHaveBeenCalledTimes(0);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(0);

        element().setAttribute("value", 1);
        expect(JHElement.prototype.render).toHaveBeenCalledTimes(0);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(0);

        element().connectedCallback();
        expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(1);

        // Should not initialize further
        element().connectedCallback();
        expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(2);
    })

    it("should handle attributes by default", function() {
        let jhelement = new JHElement();
        let element = () => jhelement;

        expect(element().constructor.observedAttributes).toEqual([ ]);
        element().attributeChangedCallback("s-val", "", "123");
        expect(typeof(element()._sVal)).toBe("string");
        expect(element()._sVal).toBe("123");
        expect(element()._sVal).not.toBe(123);
    })

    it("should parse attributes correctly", function() {
        let jhelement = new JHElementTest();
        let element = () => jhelement;

        expect(element()._sVal).toBe("");
        expect(element()._sInt).toBe(0);
        expect(element()._sObj).toBe(null);
        expect(element()._sBool).toBe(false);

        expect(element().constructor.observedAttributes).toEqual([ "s-val", "s-int", "s-obj", "s-bool", "value" ]);

        element().attributeChangedCallback("s-val", "", "123");
        expect(typeof(element()._sVal)).toBe("string");
        expect(element()._sVal).toBe("123");
        expect(element()._sVal).not.toBe(123);

        element().attributeChangedCallback("s-int", "", "123");
        expect(typeof(element()._sInt)).toBe("number");
        expect(element()._sInt).toBe(123);
        expect(element()._sInt).not.toBe("123");

        element().attributeChangedCallback("s-int", "", "123.5");
        expect(typeof(element()._sInt)).toBe("number");
        expect(element()._sInt).toBe(123.5);
        expect(element()._sInt).not.toBe("123.5");

        element().attributeChangedCallback("s-obj", "", JSON.stringify({a:1}));
        expect(typeof(element()._sObj)).toBe("object");
        expect(element()._sObj).toEqual({a:1});

        element().attributeChangedCallback("s-obj", "", "{a:}");
        expect(typeof(element()._sObj)).toBe("object");
        expect(element()._sObj).toEqual(null);

        element().attributeChangedCallback("s-bool", "", "");
        expect(typeof(element()._sBool)).toBe("boolean");
        expect(element()._sBool).toBeTruthy();

        element().attributeChangedCallback("s-bool", "", "false");
        expect(typeof(element()._sBool)).toBe("boolean");
        expect(element()._sBool).toBeFalsy();

        element().attributeChangedCallback("s-bool", "", null);
        expect(typeof(element()._sBool)).toBe("boolean");
        expect(element()._sBool).toBeFalsy();
    })

    webDescribe('without parameter', "<jh-element></jh-element>", function(element) {
        it("should instanciate empty", function(done) {
            expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
            expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(1);

            // We dont' listen to this, so it does make nothing...
            element().setAttribute("value", 1);
            expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
            expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(1);

            done();
        });

        it("should createElementAndAddThem", function() {
            element().createElementAndAddThem("<div>test<span>subcontent</span></div>");
            let el = element().firstChild;
            expect(el.tagName).toBe("DIV");
            expect(el.textContent).toContain("test");
            expect(el.textContent).toContain("subcontent");

            expect(el.querySelector("span")).not.toBeNull();
            expect(el.querySelector("span").innerHTML).toBe("subcontent");
        })

        it("should createElementAndAddThem to not existing target", function() {
            element().createElementAndAddThem("<div id='anything'>anything</div>", null);
            expect(element().querySelector("#anything")).toBeNull();
        })

        it("should manage events", function() {
            let res = {}
            element().addEventListener("changed", (event) => {
                res = event.detail;
            });

            expect(res).toEqual({});
            
            element().fire("anything", 123);
            expect(res).toEqual({});

            element().fire("changed", 123);
            expect(res).toEqual(123);
        })
    });

    it("shoudl not be initialized when created without rendering", function() {
        const el = new JHElementTest();
        expect(el.isInitialized()).toBeFalsy();
    })

    webDescribe("with some parameters", `<jh-element-test s-val='null' s-obj='null'></jh-element-test>`, function(element) {
        it("should have a null value", function() {
            expect(element()._sVal).toBe("");
            expect(element()._sObj).toEqual(null);

            expect(element().sVal).toBe("");
            expect(element().sObj).toEqual(null);
        });
    });

    webDescribe("with specific handler", `<jh-element-test value='123' s-val='abc'></jh-element-test>`, function(element) {
        it("should handle it", function() {
            expect(element()._value).toBe('123');
            expect(element().value).toBe('123');

            // Changes generated before the first render does not trigger the onValueChanged()
            expect(element().valueChanged).toBeUndefined();
            element().setAttribute('value', '456');
            expect(element()._value).toBe('456');
            expect(element().valueChanged).toBe(1);

            element().setAttribute('s-bool', 'true');
            expect(element()._sBool).toBe(true);
            expect(element().sBool).toBe(true);

            element().setAttribute('s-bool', 'false');
            expect(element()._sBool).toBe(false);
            expect(element().sBool).toBe(false);

            element().setAttribute('s-bool', '');
            expect(element()._sBool).toBe(true);
            expect(element().sBool).toBe(true);

            element().removeAttribute('s-bool', '');
            expect(element()._sBool).toBe(false);
            expect(element().sBool).toBe(false);
        });

        it("should not fail with no handler", function() {
            expect(element()._sVal).toBe('abc');
            expect(element().sVal).toBe('abc');

            // Changes generated before the first render does not trigger the onValueChanged()
            element().setAttribute('s-val', 'def');
            expect(element()._sVal).toBe('def');
            expect(element().sVal).toBe('def');
        });
    });
});
