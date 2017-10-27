'use strict';
/* global testComponent */

describe('edit-bill-category-test', function() {
    let priceCategory = [
        {
            category: 'cat',
            title: 'Price 1',
            Amount: 10
        },
        {
            category: 'cat',
            title: 'Price 2',
            Amount: 20
        },
        {
            category: 'other',
            title: 'Price 3',
            Amount: 30
        },
        {
            category: 'cat',
            title: 'Other',
            Amount: 1
        }
    ];

    let value = [
        {
            title: 'Price 1',
            Amount: 5
        },
        {
            title: 'Other',
            Amount: 55
        }
    ]

    webDescribe("instanciate with price and bill", `<edit-bill-category value='${JSON.stringify(value)}' price-lines='${JSON.stringify(priceCategory)}' category='cat'></edit-bill-category>`, function(element) {
        it("should instanciate", function() {
            expect(element().textContent).toContain("Price 1");
            expect(element().textContent).toContain("Price 2");
            expect(element().textContent).not.toContain("Price 3");
            expect(element().textContent).toContain("Other");
        });
    });
});
