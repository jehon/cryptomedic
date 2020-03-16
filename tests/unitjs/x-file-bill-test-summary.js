

import '../../app/elements/x-file-bill-summary.js';

import { webDescribe, loadReference } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import store, { ACT_DEFINITIONS_STORE } from '../../app/js/store.js';

describe('tests/unit/x-file-bill-test-summary.js', function () {
	function hasRow(element, name, value) {
		expect(element().innerHTML).toContain(name);
		expect(element().innerHTML).toContain(`name="${name}">${value}<`);
	}

	beforeAll(function () {
		const prices = loadReference('PriceTest.testIndex.json');
		store.dispatch({ type: ACT_DEFINITIONS_STORE, payload: { prices } });
	});

	let getBill = function (ref = 'FolderTest.test1.json', id = 1) {
		let f = new Folder(loadReference(ref).folder);
		expect(f).toEqual(jasmine.any(Folder));
		return f.getByTypeAndId(Bill, id);
	};

	webDescribe('initialized', '<x-file-bill-summary></x-file-bill-summary>', function (element) {
		it('should be instantiated', function () {
			let b = getBill('FolderTest.test1.json', 1);
			element().value = b;
			hasRow(element, 'Sociallevel', '2');
			hasRow(element, 'total_asked', '6720');
			hasRow(element, 'consult_CDC_consultation_physio', 1);
			hasRow(element, 'workshop_BHKAFO_night', 1);
			expect(element().innerHTML).not.toContain('consult_CDC_consultation_Bengali_Doctor');
		});
	});
});
