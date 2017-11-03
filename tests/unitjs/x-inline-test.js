'use strict';

describe('x-inline-test', function() {
    beforeEach(function() {
        spyOn(console, "error");
    })

    webDescribe("without parameters", `<x-inline></x-inline>`, function(element) {
        it("should be instanciated", function() {
            let xelement = element().querySelector("x-read");
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBe("");
            expect(xelement.getAttribute('type')).toBe("");
            expect(xelement.getAttribute('value')).toBe("");
        })
    })

    webDescribe("with mode read", `<x-inline name='xname' type='xtype' value='xvalue'></x-inline>`, function(element) {
        it("should be instanciated", function() {
            let xelement = element().querySelector("x-read");
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBe("xname");
            expect(xelement.getAttribute('type')).toBe("xtype");
            expect(xelement.getAttribute('value')).toBe("xvalue");
        })
    })

    webDescribe("without parameters", `<x-inline edit inline='xinline'></x-inline>`, function(element) {
        it("should be instanciated", function() {
            let xelement = element().querySelector("x-write");
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBe("");
            expect(xelement.getAttribute('type')).toBe("");
            expect(xelement.getAttribute('value')).toBe("");
            expect(xelement.getAttribute('inline')).toBe("xinline");
        })
    })

    webDescribe("with mode edit", `<x-inline edit name='xname' type='xtype' value='xvalue' inline='xinline'></x-inline>`, function(element) {
        it("should be instanciated", function() {
            let xelement = element().querySelector("x-write");
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBe("xname");
            expect(xelement.getAttribute('type')).toBe("xtype");
            expect(xelement.getAttribute('value')).toBe("xvalue");
            expect(xelement.getAttribute('inline')).toBe("xinline");
        })
    })
});
