
import { webDescribe } from './athelpers.js';

import '../../app/elements/block-bill-category.js';
import JHElement from '../../app/elements/jh-element.js';

xdescribe('block-bill-category-test', function () {
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
    ];

    webDescribe('instanciate without prices', '<block-bill-category category=\'cat\'></block-bill-category>', function (element) {
        it('should instanciate empty', function () {
            expect(element().querySelectorAll('tbody > *').length).toBe(0);
            expect(element().getTotal()).toBe(0);
        });
    });

    webDescribe('instanciate with empty bills should be empty', `<block-bill-category value="" price-lines='${JSON.stringify(priceCategory)}' category='cat'></block-bill-category>`, function (element) {
        it('should instanciate empty', function () {
            expect(element().querySelectorAll('tbody > *').length).toBe(0);
            expect(element().getTotal()).toBe(0);
        });
    });

    webDescribe('instanciate with price and bill', `<block-bill-category value='${JSON.stringify(value)}' price-lines='${JSON.stringify(priceCategory)}' category='cat'></block-bill-category>`, function (element) {
        it('should instanciate', function () {
            expect(element().textContent).toContain('Price 1');
            expect(element().textContent).not.toContain('Price 2');
            expect(element().textContent).not.toContain('Price 3');
            expect(element().textContent).toContain('Other');
            expect(element().getTotal()).toBe(105);
            expect(element().querySelector('#catTotal').textContent).toContain(105);
        });

        it('should build up a bill lines list', function () {
            expect(element().getBillLines()).toEqual(value);
        });
    });

    webDescribe('instanciate with price and bill in edit mode', `<block-bill-category edit value='${JSON.stringify(value)}' price-lines='${JSON.stringify(priceCategory)}' category='cat'></block-bill-category>`, function (element) {
        it('should instanciate', function () {
            expect(element().textContent).toContain('Price 1');
            expect(element().textContent).toContain('Price 2');
            expect(element().textContent).not.toContain('Price 3');
            expect(element().textContent).toContain('Other');
            expect(element().querySelector('block-bill-line').hasAttribute('edit')).toBeTruthy();
            expect(element().getTotal()).toBe(105);
            expect(element().querySelector('#catTotal').textContent).toContain(105);
        });

        it('should react to change event', function () {
            expect(element().getTotal()).toBe(105);
            expect(element().querySelector('#catTotal').textContent).toContain(105);
            let el = element().querySelector('block-bill-line');
            el.querySelector('input').value = 10;
            JHElement.fireOn(element().querySelector('x-inline'), 'blur', 10);
            expect(element().querySelector('#catTotal').textContent).toContain(155);
        });

        it('should build up a bill lines list', function () {
            expect(element().getBillLines()).toEqual(value);
        });
    });
});
