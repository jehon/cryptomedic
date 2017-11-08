'use strict';
/* global testComponent */

describe('x-write-test', function() {
    beforeEach(function() {
      spyOn(console, "error");
    })

    webDescribe("without parameters", `<x-write name='test'></x-write`, function(element) {
        it("should be instantiated", function() {
            expect(element().querySelector('span.error')).not.toBeNull();
        });
    })

    webDescribe("with unknown type", `<x-write name='test' type='anything'></x-write`, function(element) {
        it("should be instantiated", function() {
            expect(element().querySelector('span.error')).not.toBeNull();
            expect(console.error).toHaveBeenCalledTimes(1);
        });
    })

    describe("with timestamp", function() {
        webDescribe("without value", `<x-write name='test' type='timestamp'></x-write`, function(element) {
            it("should be instantiated", function() {
                expect(element().querySelector('span.error')).toBeNull();
                let el = element().querySelector('x-read');
                expect(el).not.toBeNull();
                expect(el.getAttribute('name')).toBe("test");
                expect(el.getAttribute('type')).toBe("timestamp");
                expect(element().getValue()).toBe("");
            });
        })

        webDescribe("with value", `<x-write name='test' type='timestamp' value='2016-01-01'></x-write`, function(element) {
            it("should be instantiated", function() {
                expect(element().querySelector('span.error')).toBeNull();
                let el = element().querySelector('x-read');
                expect(el).not.toBeNull();
                expect(el.getAttribute('name')).toBe("test");
                expect(el.getAttribute('type')).toBe("timestamp");
                expect(el.getAttribute('value')).toBe("2016-01-01");
                expect(element().getValue()).toBe("2016-01-01");
            });
        })
    })

    describe("with boolean", function() {
        webDescribe("without value", `<x-write name='test' type='boolean'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('input[type=checkbox]');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                expect(element().getValue()).toBe(false);
            });
        })

        webDescribe("with value", `<x-write name='test' type='boolean' value='1'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('input[type=checkbox]');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                expect(element().getValue()).toBe(true);
            });

            it("should fire event", function() {
                let el = element().querySelector('input[type=checkbox]');
                let res = false;
                element().addEventListener("change", (event) => { res = "test" });
                el.setAttribute("checked", "checked");
                JHElement.fireOn(element().querySelector("input"), "change", "test");
                expect(res).toBe("test");
                expect(element().getValue()).toBe(true);
            })
        })
    })

    describe("with date", function() {
        webDescribe("without value", `<x-write name='test' type='date'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('input[type=date]');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                expect(element().getValue()).not.toBeNull();
            });
        })

        webDescribe("with value", `<x-write name='test' type='date' value='2016-01-15'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('input[type=date]');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                expect(element().getValue()).toBe("2016-01-15");
            });

            it("should fire event", function() {
                let el = element().querySelector('input[type=date]');
                let res = false;
                element().addEventListener("change", (event) => { res = "test" });
                el.value = "2016-02-25";
                JHElement.fireOn(element().querySelector("input"), "change", "test");
                expect(res).toBe("test");
                expect(element().getValue()).toBe("2016-02-25");
            })
        })
    })

    describe("with numeric", function() {
        webDescribe("without value", `<x-write name='test' type='numeric'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('input[type=number]');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                expect(element().getValue()).toBe(null);
            });
        })

        webDescribe("with value", `<x-write name='test' type='numeric' value='15'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('input[type=number]');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                expect(element().getValue()).toBe(15);
            });

            it("should fire event", function() {
                let el = element().querySelector('input[type=number]');
                let res = false;
                element().addEventListener("change", (event) => { res = "test" });
                el.value = 10;
                JHElement.fireOn(element().querySelector("input"), "change", "test");
                expect(res).toBe("test");
                expect(element().getValue()).toBe(10);
            })
        })
    })

    describe("with char", function() {
        webDescribe("without value", `<x-write name='test' type='char'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('input');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                expect(element().getValue()).toBe("");
            });
        })

        webDescribe("with value", `<x-write name='test' type='char' value='xvalue'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('input');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                expect(element().getValue()).toBe("xvalue");
            });

            it("should fire event", function() {
                let el = element().querySelector('input');
                let res = false;
                element().addEventListener("change", (event) => { res = "test" });
                el.value = "blablabla";
                JHElement.fireOn(element().querySelector("input"), "change", "test");
                expect(res).toBe("test");
                expect(element().getValue()).toBe("blablabla");
            })
        })
    })

// TODO:

    const list = [ 'machin', 'truc', 'brol' ];

    fdescribe("with list", function() {
        webDescribe("without value", `<x-write name='test' type='list' list='${JSON.stringify(list)}'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('x-write-list');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                expect(element().getValue()).toBe(null);
            });
        })

        webDescribe("with value", `<x-write name='test' type='list' list='${JSON.stringify(list)}' value='truc'></x-write`, function(element) {
            it("should be instantiated", function() {
                let el = element().querySelector('x-write-list');
                expect(element().querySelector('span.error')).toBeNull();
                expect(el).not.toBeNull();
                console.log(el);
                console.log(el.list, el.listName);
                expect(element().getValue()).toBe("truc");
            });

            it("should fire event", function() {
                let el = element().querySelector('x-write-list');
                let res = false;
                element().addEventListener("change", (event) => { res = "test" });
                el.value = "brol";
                JHElement.fireOn(element().querySelector("x-write-list"), "change", "test");
                expect(res).toBe("test");
                expect(element().getValue()).toBe("brol");
            })
        })
    })

});
