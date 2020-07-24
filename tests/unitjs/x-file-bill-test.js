
import '../../app/elements/x-file-bill.js';

import { webDescribe, loadReference, refFolder1 } from './athelpers.js';
import Folder from '../../app/models/Folder.js';
import Bill from '../../app/models/Bill.js';
import { setSession } from '../../app/js/session.js';

// TODO: use constructor instead of webDescribe

describe('tests/unit/x-file-bill-test.js', function () {
    let getBill = function (ref = refFolder1, id = 1) {
        let f = new Folder(loadReference(ref).folder);
        expect(f).toEqual(jasmine.any(Folder));
        return f.getByTypeAndId(Bill, id);
    };

    webDescribe('initialized', '<x-file-bill></x-file-bill>', function (element) {
        describe('without prices', function () {
            beforeEach(function () {
                setSession();
            });

            it('should be instantiated', function () {
                let b = getBill(refFolder1, 1);
                element().value = b;

                setSession({});
                expect(element().innerHTML).toContain('bill available');
                expect(element().price).toBeFalsy();
                expect(element().getFieldsBelongingTo('anything')).toEqual([]);

                setSession({});
                expect(element().price).toBeFalsy();

                const prices = loadReference('PriceTest.testIndex.json');
                prices[0].datefrom = '2015-01-01';
                setSession({ prices });
                expect(element().price).toBeFalsy();
            });

            it('should label elements', function () {
                expect(element().label('test')).toBe('test');
                expect(element().label('_test')).toBe('_test');
                expect(element().label('one_two_three')).toBe('two three');
            });
        });

        describe('with prices', function () {
            beforeEach(function () {
                const prices = loadReference('PriceTest.testIndex.json');
                setSession({ prices });

                element().value = getBill(refFolder1, 1);
            });

            it('should be configured', function () {
                expect(element().innerHTML).toContain('bill available');
                expect(element().price).not.toBeFalsy();
                expect(element().categoriesList).toContain('other');
            });

            it('should getFieldsBelongingTo', function () {
                expect(element().getFieldsBelongingTo('anything')).toEqual([]);
                expect(element().getFieldsBelongingTo('other').length).toBe(16);
                expect(element().getFieldsBelongingTo('other')).toContain('other_making_plaster');
                expect(element().getFieldsBelongingTo('other')).not.toContain('consult_home_visit');
                expect(element().getFieldsBelongingTo('other')).not.toContain('created_at');
            });
        });
    });
});
