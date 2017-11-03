
describe('block-bill-category-test', function() {
    let priceCategory = [
        {
            type: 'cat',
            title: 'Price 1',
            Amount: 10
        },
        {
            type: 'cat',
            title: 'Price 2',
            Amount: 20
        },
        {
            type: 'other',
            title: 'Price 3',
            Amount: 30
        },
        {
            type: 'cat',
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

    webDescribe("instanciate without prices", `<block-bill-category value='${JSON.stringify(value)}' category='cat'></block-bill-category>`, function(element) {
        it("should instanciate empty", function() {
            expect(element().querySelectorAll("tbody > *").length).toBe(0);
            expect(element().getTotal()).toBe(0);
        })
    });

    webDescribe("instanciate with price and bill", `<block-bill-category value='${JSON.stringify(value)}' price-lines='${JSON.stringify(priceCategory)}' category='cat'></block-bill-category>`, function(element) {
        it("should instanciate", function() {
            expect(element().textContent).toContain("Price 1");
            expect(element().textContent).toContain("Price 2");
            expect(element().textContent).not.toContain("Price 3");
            expect(element().textContent).toContain("Other");
            expect(element().getTotal()).toBe(105);
            expect(element().querySelector("#catTotal").textContent).toContain(105);
        });

        it("should react to change event", function() {
            expect(element().getTotal()).toBe(105);
            expect(element().querySelector("#catTotal").textContent).toContain(105);
            let res = false;
            let el = element().querySelector("block-bill-line");
            el.querySelector("x-inline").value = 10;
            JHElement.fireOn(element().querySelector("x-inline"), "change", 10);
            expect(element().querySelector("#catTotal").textContent).toContain(155);
        });

        it("should build up a bill lines list", function() {
            expect(element().getBillLines()).toEqual(value);
        })
    });
});
