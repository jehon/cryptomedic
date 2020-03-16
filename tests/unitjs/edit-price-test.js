
import { webDescribe } from './athelpers.js';
import '../../app/elements/edit-price.js';

describe('edit-price-test', function () {
	webDescribe('', '<edit-price value=\'-1\'></edit-price>', function (element) {
		it('should initalize with value=-1', () => {
			expect(element()).not.toBeNull();
			expect(element().shadowRoot.querySelectorAll('input[type=radio]').length).toBe(3);
			expect(element().shadowRoot.querySelector('input[type=radio][checked][value="-1"]')).not.toBeNull();
			expect(element().shadowRoot.querySelector('input[type=radio][checked][value="1"]')).toBeNull();
			expect(element().shadowRoot.querySelector('input[type=radio][checked][value="0"]')).toBeNull();

			expect(element().shadowRoot.querySelector('input[type=number]')).toBeNull();

			expect(element().value).toBe(-1);
		});
	});

	webDescribe('', '<edit-price value=\'1\'></edit-price>', function (element) {
		it('should initalize with value=1', () => {
			expect(element()).not.toBeNull();
			expect(element().shadowRoot.querySelectorAll('input[type=radio]').length).toBe(3);
			expect(element().shadowRoot.querySelector('input[type=radio][checked][value="1"]')).not.toBeNull();
			expect(element().shadowRoot.querySelector('input[type=radio][checked][value="-1"]')).toBeNull();
			expect(element().shadowRoot.querySelector('input[type=radio][checked][value="0"]')).toBeNull();

			expect(element().shadowRoot.querySelector('input[type=number]')).toBeNull();

			expect(element().value).toBe(1);
		});
	});

	webDescribe('', '<edit-price value=\'200\'></edit-price>', function (element) {
		it('should initalize with value 200', () => {
			expect(element()).not.toBeNull();
			expect(element().shadowRoot.querySelectorAll('input[type=radio]').length).toBe(3);
			expect(element().shadowRoot.querySelector('input[type=radio][checked][value="1"]')).toBeNull();
			expect(element().shadowRoot.querySelector('input[type=radio][checked][value="-1"]')).toBeNull();
			expect(element().shadowRoot.querySelector('input[type=radio][checked][value="0"]')).not.toBeNull();

			expect(element().shadowRoot.querySelector('input[type=number]')).not.toBeNull();
			expect(element().shadowRoot.querySelector('input[type=number]').value).toBe('200');

			expect(element().value).toBe(200);
		});
	});

	// xit("should react to value setted externally", (done) => {
	//   // TODO
	//   done();
	// });
});
