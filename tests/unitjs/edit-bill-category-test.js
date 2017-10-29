
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

    webDescribe("instanciate without prices", `<edit-bill-category value='${JSON.stringify(value)}' category='cat'></edit-bill-category>`, function(element) {
        it("should instanciate empty", function() {
            expect(element().querySelectorAll("tbody > *").length).toBe(0);
            expect(element().getTotal()).toBe(0);
        })
    });

    webDescribe("instanciate with price and bill", `<edit-bill-category value='${JSON.stringify(value)}' price-lines='${JSON.stringify(priceCategory)}' category='cat'></edit-bill-category>`, function(element) {
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
            let el = element().querySelector("edit-bill-line");
            el.querySelector("input").value = 10;
            el.fire("change", "test", element().querySelector("input"));
            expect(element().querySelector("#catTotal").textContent).toContain(155);
        });

        it("should build up a bill lines list", function() {
            console.log("LL", element().getBillLines());
            // let expected = [];
            // expected[0] = value[0];
            // expected[1] = { title: 'Price 2', Amount: 0 };
            // expected[2] = value[1];
            expect(element().getBillLines()).toEqual(value);
        })
    });
});
