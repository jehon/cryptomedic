'use strict';
/* global testComponent */

describe('test-edit-bill-line', function() {
    const price = { 
        title: "Some price",
        Amount: 100
    }

    const other = { 
        title: "Other",
        Amount: 1
    }

    const bill = {
        title: "Some price",
        Amount: 2
    }

    webDescribe("instanciate empty", `<edit-bill-line></edit-bill-line>`, function(element) {
        it("should instanciate", function(done) {
            expect(element().querySelector("#title").textContent).toBe("Unknown");
            expect(element().querySelector("#price").textContent).toBe("1");
            expect(element().querySelector("input").value).toBe("0");
            expect(element().getTotal()).toBe(0);
            expect(element().getBillLine()).toEqual({ title: "Unknown", Amount: 0 });
            done();
        });
    });

    webDescribe("instanciate with price", `<edit-bill-line price='${JSON.stringify(price)}'></edit-bill-line>`, function(element) {
        it("should instanciate", function(done) {
            expect(element().price).toEqual(price);
            expect(element().querySelector("#title").textContent).toBe("Some price");
            expect(element().querySelector("#price").textContent).toBe("100");
            expect(element().querySelector("input").value).toBe("0");
            expect(element().getTotal()).toBe(0);
            expect(element().getBillLine()).toEqual({ title: "Some price", Amount: 0 });
            done();
        });
    });

    webDescribe("instanciate with price 1", `<edit-bill-line price='${JSON.stringify(other)}'></edit-bill-line>`, function(element) {
        it("should instanciate", function(done) {
            expect(element().price).toEqual(other);
            expect(element().querySelector("#title").textContent).toBe("Other");
            expect(element().querySelector("#price").textContent).toBe("1");
            expect(element().querySelector("input").value).toBe("0");
            expect(element().getTotal()).toBe(0);
            expect(element().getBillLine()).toEqual({ title: "Other", Amount: 0 });
            done();
        });
    });

    webDescribe("instanciate with price and bill", `<edit-bill-line price='${JSON.stringify(price)}' value='${JSON.stringify(bill)}'></edit-bill-line>`, function(element) {
        it("should instanciate", function(done) {
            expect(element().price).toEqual(price);
            expect(element().querySelector("#title").textContent).toBe("Some price");
            expect(element().querySelector("#price").textContent).toBe("100");
            expect(element().querySelector("input").value).toBe("2");
            expect(element().getTotal()).toBe(200);
            expect(element().getBillLine()).toEqual({ title: "Some price", Amount: 2 });
            done();
        });
    });
});
