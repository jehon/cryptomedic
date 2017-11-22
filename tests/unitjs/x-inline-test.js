'use strict';

describe('x-inline-test', function() {
    beforeEach(function() {
        spyOn(console, "error");
    })

    webDescribe("without parameters", `<x-inline edit inline='xinline'></x-inline>`, function(element) {
        it("should be instanciated", function() {
            let xelement = element().querySelector("x-write");
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBeNull();
            expect(xelement.getAttribute('type')).toBe("");
            expect(xelement.getAttribute('value')).toBe("");
            expect(xelement.getAttribute('inline')).toBe("xinline");
        })
    })

    webDescribe("without parameters", `<x-inline></x-inline>`, function(element) {
        it("should be instanciated", function() {
            let xelement = element().querySelector("x-read");
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBeNull();
            expect(xelement.getAttribute('type')).toBe("");
            expect(xelement.getAttribute('value')).toBe("");
        })
    })

    webDescribe("with mode read", `<x-inline name='xname' type='xtype' value='xvalue'></x-inline>`, function(element) {
        it("should be instanciated", function() {
            let xelement = element().querySelector("x-read");
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBeNull();
            expect(xelement.getAttribute('type')).toBe("xtype");
            expect(xelement.getAttribute('value')).toBe("xvalue");
        })
    })

    webDescribe("with mode edit", `<x-inline edit name='xname' type='numeric' value='xvalue' inline='xinline'></x-inline>`, function(element) {
        it("should be instanciated", function() {
            let xelement = element().querySelector("x-write");
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBeNull();
            expect(xelement.getAttribute('type')).toBe("numeric");
            expect(xelement.getAttribute('value')).toBe("xvalue");
            expect(xelement.getAttribute('inline')).toBe("xinline");
        })

        it("should fire event", function() {
            let res = false;
            element().addEventListener("change", (event) => { res = "test" });
            const input = element().querySelector("input");
            input.value = 10;
            JHElement.fireOn(input, "change", 10);
            expect(res).toBe("test");
            expect(element().getValue()).toBe(10);
        })
    })
});
