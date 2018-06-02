/* eslint-env jasmine */
/* global webDescribe, JHElement, store */
/* global loadReference, Folder, Bill */

describe('tests/unit/x-file-bill-test.js', function() {
	beforeAll(function() {
		const prices = loadReference('PriceTest.testIndex.json');
		store.dispatch({ type: 'ACT_DEFINITIONS_STORE', payload: { prices }});
	});

	let getBill = function(ref = 'FolderTest.test1.json', id = 1) {
		let f = new Folder(loadReference(ref).folder);
		expect(f).toEqual(jasmine.any(Folder));
		return f.getByTypeAndId(Bill, id);
	};

	webDescribe('initialized', '<x-file-bill></x-file-bill>', function(element) {
		it('should be instantiated', function() {
			let b = getBill('FolderTest.test1.json', 1);
			element().value = b;
			expect(element().innerHTML).toContain('bill available');
		});
	});
});
