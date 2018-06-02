/* eslint-env jasmine */
/* global webDescribe, JHElement, store */
/* global loadReference, Folder, Bill */

describe('tests/unit/x-file-bill-test.js', function() {
	let getBill = function(ref = 'FolderTest.test1.json', id = 1) {
		let f = new Folder(loadReference(ref).folder);
		expect(f).toEqual(jasmine.any(Folder));
		return f.getByTypeAndId(Bill, id);
	};

	webDescribe('initialized', '<x-file-bill></x-file-bill>', function(element) {

		describe('without prices', function() {
			beforeEach(function() {
				store.dispatch({ type: 'ACT_USER_LOGOUT', payload: { }});
			});

			it('should be instantiated', function() {
				let b = getBill('FolderTest.test1.json', 1);
				element().value = b;

				store.dispatch({ type: 'ACT_USER_LOGOUT', payload: { }});
				expect(element().innerHTML).toContain('bill available');
				expect(element().price).toBeFalsy();
				expect(element().getFieldsBelongingTo('anything')).toEqual([]);

				store.dispatch({ type: 'ACT_DEFINITIONS_STORE', payload: { prices: [] }});
				expect(element().price).toBeFalsy();

				const prices = loadReference('PriceTest.testIndex.json');
				prices[0].datefrom = '2015-01-01';
				store.dispatch({ type: 'ACT_DEFINITIONS_STORE', payload: { prices }});
				expect(element().price).toBeFalsy();
			});
		});

		describe('with prices', function() {
			beforeEach(function() {
				const prices = loadReference('PriceTest.testIndex.json');
				store.dispatch({ type: 'ACT_DEFINITIONS_STORE', payload: { prices }});

				element().value = getBill('FolderTest.test1.json', 1);
			});

			it('should be configured', function() {
				expect(element().innerHTML).toContain('bill available');
				expect(element().price).not.toBeFalsy();
			});

			it('should getFieldsBelongingTo', function() {
				expect(element().getFieldsBelongingTo('anything')).toEqual([]);
				expect(element().getFieldsBelongingTo('other').length).toBe(16);
				expect(element().getFieldsBelongingTo('other')).toContain('other_making_plaster');
				expect(element().getFieldsBelongingTo('other')).not.toContain('consult_home_visit');
				expect(element().getFieldsBelongingTo('other')).not.toContain('created_at');
			});
		});
	});
});
