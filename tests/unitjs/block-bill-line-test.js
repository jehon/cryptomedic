
import { webDescribe } from './athelpers.js';

import '../../app/elements/block-bill-line.js';
import JHElement from '../../app/elements/jh-element.js';

xdescribe('block-bill-line-test', function () {
    const price = {
        title: 'Some price',
        Amount: 100
    };

    const other = {
        title: 'Other',
        Amount: 1
    };

    const bill1 = {
        title: 'Some price',
        Amount: 2
    };

    const bill2 = {
        title: 'Some price',
        Amount: 2,
        id: 333,
        Date: '2016-01-02'
    };

    webDescribe('instanciate empty', '<block-bill-line></block-bill-line>', function (element) {
        it('should instanciate', function (done) {
            expect(element().querySelector('#title').textContent).toBe('Unknown');
            expect(element().querySelector('#price').textContent).toBe('1');
            expect(element().querySelector('x-io-numeric').value).toBe(0);
            expect(element().getTotal()).toBe(0);
            expect(element().getBillLine()).toEqual({ title: 'Unknown', Amount: 0 });
            done();
        });
    });

    webDescribe('instanciate with price', `<block-bill-line price='${JSON.stringify(price)}'></block-bill-line>`, function (element) {
        it('should instanciate', function () {
            expect(element()._price).toEqual(price);
            expect(element().querySelector('#title').textContent).toBe('Some price');
            expect(element().querySelector('#price').textContent).toBe('100');
            expect(element().querySelector('x-io-numeric').value).toBe(0);
            expect(element().querySelector('#total').textContent).toBe('0');
            expect(element().getTotal()).toBe(0);
            expect(element().getBillLine()).toEqual({ title: 'Some price', Amount: 0 });
        });

        it('should fire event', function () {
            expect(element().getTotal()).toBe(0);
            let res = false;
            element().addEventListener('blur', () => { res = 'test'; });
            element().querySelector('x-io-numeric').setAttribute('value', 10);
            JHElement.fireOn(element().querySelector('x-io-numeric'), 'blur', 'test');
            expect(element().getTotal()).toBe(1000);
            expect(res).toBe('test');
        });
    });

    webDescribe('instanciate with price 1', `<block-bill-line price='${JSON.stringify(other)}'></block-bill-line>`, function (element) {
        it('should instanciate', function (done) {
            expect(element().price).toEqual(other);
            expect(element().querySelector('#title').textContent).toBe('Other');
            expect(element().querySelector('#price').textContent).toBe('1');
            expect(element().querySelector('x-io-numeric').value).toBe(0);
            expect(element().querySelector('#total').textContent).toBe('0');
            expect(element().getTotal()).toBe(0);
            expect(element().getBillLine()).toEqual({ title: 'Other', Amount: 0 });
            done();
        });
    });

    webDescribe('instanciate with price and bill', `<block-bill-line price='${JSON.stringify(price)}' value='${JSON.stringify(bill1)}'></block-bill-line>`, function (element) {
        it('should instanciate', function (done) {
            expect(element().price).toEqual(price);
            expect(element().querySelector('#title').textContent).toBe('Some price');
            expect(element().querySelector('#price').textContent).toBe('100');
            expect(element().querySelector('x-io-numeric').value).toBe(2);
            expect(element().querySelector('#total').textContent).toBe('200');
            expect(element().getTotal()).toBe(200);
            expect(element().getBillLine()).toEqual({ title: 'Some price', Amount: 2 });
            done();
        });
    });

    webDescribe('instanciate with price and bill', `<block-bill-line price='${JSON.stringify(price)}' value='${JSON.stringify(bill2)}'></block-bill-line>`, function (element) {
        it('should instanciate', function (done) {
            expect(element().price).toEqual(price);
            expect(element().querySelector('#title').textContent).toBe('Some price');
            expect(element().querySelector('#price').textContent).toBe('100');
            expect(element().querySelector('x-io-numeric').value).toBe(2);
            expect(element().querySelector('#total').textContent).toBe('200');
            expect(element().getTotal()).toBe(200);
            expect(element().getBillLine()).toEqual({ title: 'Some price', Amount: 2, id: 333, Date: '2016-01-02' });
            done();
        });
    });

    webDescribe('instanciate with price and bill in edit mode', `<block-bill-line edit price='${JSON.stringify(price)}' value='${JSON.stringify(bill2)}'></block-bill-line>`, function (element) {
        it('should instanciate', function (done) {
            expect(element().price).toEqual(price);
            expect(element().querySelector('#title').textContent).toBe('Some price');
            expect(element().querySelector('#price').textContent).toBe('100');
            expect(element().querySelector('x-io-numeric').value).toBe(2);
            expect(element().querySelector('x-io-numeric').hasAttribute('edit')).toBeTruthy();
            expect(element().querySelector('#total').textContent).toBe('200');
            expect(element().getTotal()).toBe(200);
            expect(element().getBillLine()).toEqual({ title: 'Some price', Amount: 2, id: 333, Date: '2016-01-02' });
            done();
        });
    });

    webDescribe('instanciate with price and false bill', `<block-bill-line price='${JSON.stringify(price)}' value='false'></block-bill-line>`, function (element) {
        it('should instanciate', function (done) {
            expect(element().price).toEqual(price);
            expect(element().querySelector('#title').textContent).toBe('Some price');
            expect(element().querySelector('#price').textContent).toBe('100');
            expect(element().querySelector('x-io-numeric').value).toBe(0);
            expect(element().querySelector('#total').textContent).toBe('0');
            expect(element().getTotal()).toBe(0);
            expect(element().getBillLine()).toEqual({ title: 'Some price', Amount: 0 });
            done();
        });
    });
});
