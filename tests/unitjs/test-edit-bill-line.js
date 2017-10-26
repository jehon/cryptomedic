'use strict';
/* global testComponent */

fdescribe('test-edit-bill-line', function() {
    webDescribe("instanciate empty", "<edit-bill-line></edit-bill-line>", function(element) {
        it("should instanciate empty", function(done) {
            expect(element().querySelector("#title").textContent).toBe("Unknown");
            expect(element().querySelector("#price").textContent).toBe("1");
            expect(element().querySelector("input").value).toBe("0");
            done();
        });
    });
});