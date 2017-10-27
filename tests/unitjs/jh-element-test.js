
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

    fit("should parse attributes correctly", function() {
        let jhelement = new JHElement();
        let element = () => jhelement;

        Object.defineProperty(element().constructor, 'properties', { get: function() { return { 
            sVal: "String",
            sInt: "Integer",
            sObj: "Object",
            sBool: "Boolean"
        }; } });

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
    });
});