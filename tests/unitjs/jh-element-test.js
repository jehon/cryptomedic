
describe("test-edit-bill-line", function() {
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

        element().adaptIfInitialized();
        expect(JHElement.prototype.render).toHaveBeenCalledTimes(0);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(0);

        element().connectedCallback();
        expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(1);

        // Should not initialize further
        element().connectedCallback();
        expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(2);

        element().adaptIfInitialized();
        expect(JHElement.prototype.render).toHaveBeenCalledTimes(1);
        expect(JHElement.prototype.adapt).toHaveBeenCalledTimes(3);
    })

    it("should handle attributes by default", function() {
        let jhelement = new JHElement();
        let element = () => jhelement;

        expect(element().constructor.observedAttributes).toEqual([ ]);
        element().attributeChangedCallback("s-val", "", "123");
        expect(typeof(element().sVal)).toBe("string");
        expect(element().sVal).toBe("123");
        expect(element().sVal).not.toBe(123);
    })

    it("should parse attributes correctly", function() {
        let jhelement = new JHElement();
        let element = () => jhelement;

        Object.defineProperty(element().constructor, 'properties', { get: function() { return { 
            sVal: "String",
            sInt: "Integer",
            sObj: "Object",
            sBool: "Boolean"
        }; } });
        element()._setDefaultValues();

        expect(element().sVal).toBe("");
        expect(element().sInt).toBe(0);
        expect(element().sObj).toBe(null);
        expect(element().sBool).toBe(false);

        expect(element().constructor.observedAttributes).toEqual([ "s-val", "s-int", "s-obj", "s-bool" ]);

        element().attributeChangedCallback("s-val", "", "123");
        expect(typeof(element().sVal)).toBe("string");
        expect(element().sVal).toBe("123");
        expect(element().sVal).not.toBe(123);

        element().attributeChangedCallback("s-int", "", "123");
        expect(typeof(element().sInt)).toBe("number");
        expect(element().sInt).toBe(123);
        expect(element().sInt).not.toBe("123");

        element().attributeChangedCallback("s-int", "", "123.5");
        expect(typeof(element().sInt)).toBe("number");
        expect(element().sInt).toBe(123.5);
        expect(element().sInt).not.toBe("123.5");

        element().attributeChangedCallback("s-obj", "", JSON.stringify({a:1}));
        expect(typeof(element().sObj)).toBe("object");
        expect(element().sObj).toEqual({a:1});

        element().attributeChangedCallback("s-obj", "", "{a:}");
        expect(typeof(element().sObj)).toBe("object");
        expect(element().sObj).toEqual(null);

        let hasAttributeRes = true;
        spyOn(element(), "hasAttribute").and.callFake(() => hasAttributeRes);
        element().attributeChangedCallback("s-bool", "", "");
        expect(typeof(element().sBool)).toBe("boolean");
        expect(element().sBool).toBeTruthy();

        hasAttributeRes = false;
        element().attributeChangedCallback("s-bool", "", "");
        expect(typeof(element().sBool)).toBe("boolean");
        expect(element().sBool).toBeFalsy();
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

        it("should createElementFromString", function() {
            let el = element().createElementFromString("<div>test<span>subcontent</span></div>");
            expect(el.tagName).toBe("DIV");
            expect(el.textContent).toContain("test");
            expect(el.textContent).toContain("subcontent");

            expect(el.querySelector("span")).not.toBeNull();
            expect(el.querySelector("span").innerHTML).toBe("subcontent");
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
});