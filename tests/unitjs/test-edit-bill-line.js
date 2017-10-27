'use strict';
/* global testComponent */

fdescribe('test-edit-bill-line', function() {
    const price = { 
        title: "Some price",
        Amount: 100
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
            done();
        });
    });

    webDescribe("instanciate with price", `<edit-bill-line price='${JSON.stringify(price)}'></edit-bill-line>`, function(element) {
        it("should instanciate", function(done) {
            expect(element().price).toEqual(price);
            expect(element().querySelector("#title").textContent).toBe("Some price");
            expect(element().querySelector("#price").textContent).toBe("100");
            expect(element().querySelector("input").value).toBe("0");
            done();
        });
    });

    webDescribe("instanciate with price", `<edit-bill-line price='${JSON.stringify(price)}' value='${JSON.stringify(bill)}'></edit-bill-line>`, function(element) {
        it("should instanciate", function(done) {
            expect(element().price).toEqual(price);
            expect(element().querySelector("#title").textContent).toBe("Some price");
            expect(element().querySelector("#price").textContent).toBe("100");
            expect(element().querySelector("input").value).toBe("2");
            done();
        });
    });
});
