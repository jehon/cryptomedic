/* eslint-env jasmine */
/* global webDescribe, JHElement */
/* global store, ACT_DEFINITIONS_STORE */

describe('jh-codage-test', function() {
	describe('without definitions', function() {
		beforeEach(function() {
			store.dispatch({ type: ACT_DEFINITIONS_STORE, payload: false });
		});

		webDescribe('with value=original', '<jh-codage value=\'original\'></jh-codage>', function(element) {
			it('should translate correctly when specified in globals', function() {
				store.dispatch({ type: ACT_DEFINITIONS_STORE, payload: false });
				expect(element()).not.toBeNull();
				expect(element().shadowRoot).not.toBeNull();
				expect(element().shadowRoot.querySelector('#original').textContent).toBe('original');
				expect(element().shadowRoot.querySelector('#translating')).toBeNull();
				expect(element().shadowRoot.querySelector('#translated')).toBeNull();
				expect(element().getAttribute('calculated-translated')).toBe('');
			});
		});
	});

	describe('with cryptomedic', function() {
		beforeEach(function() {
			store.dispatch({ type: ACT_DEFINITIONS_STORE, payload: { 
				codes: {
					'original': 'codage'
				}
			}});
		});

		webDescribe('with value empty', '<jh-codage value=\'\'></jh-codage>', function(element) {
			it('should handle empty values', function() {
				expect(element()).not.toBeNull();
				expect(element().shadowRoot.querySelector('#original').textContent).toBe('');
				expect(element().shadowRoot.querySelector('#translating')).toBeNull();
				expect(element().shadowRoot.querySelector('#translated')).toBeNull();
				expect(element().getAttribute('calculated-translated')).toBe('');
			});
		});

		webDescribe('with translated is local', '<jh-codage value=\'original\' translated=\'local\'></jh-codage>', function(element) {
			it('should translate correctly when specified directly', function() {
				expect(element()).not.toBeNull();
				expect(element().shadowRoot).not.toBeNull();
				expect(element().shadowRoot.querySelector('#original')).toBeNull();
				expect(element().shadowRoot.querySelector('#translating').attributes.title.textContent).toEqual('original');
				expect(element().shadowRoot.querySelector('#translated').textContent).toEqual('local');
				expect(element().getAttribute('calculated-translated')).toBe('local');
			});
		});

		webDescribe('with value is original and is translatable', '<jh-codage value=\'original\'></jh-codage>', function(element) {
			it('should translate correctly when specified in globals', function() {
				expect(element()).not.toBeNull();
				expect(element().shadowRoot).not.toBeNull();
				expect(element().shadowRoot.querySelector('#original')).toBeNull();
				expect(element().shadowRoot.querySelector('#translating').attributes.title.textContent).toEqual('original');
				expect(element().shadowRoot.querySelector('#translated').textContent).toEqual('codage');
				expect(element().getAttribute('calculated-translated')).toBe('codage');
			});
		});

		webDescribe('with value is anything and is not translatable', '<jh-codage value=\'anything\'></jh-codage>', function(element) {
			it('should translate invalid codes', function() {
				expect(element()).not.toBeNull();
				expect(element().shadowRoot.querySelector('#original').textContent).toBe('anything');
				expect(element().shadowRoot.querySelector('#translating')).toBeNull();
				expect(element().shadowRoot.querySelector('#translated')).toBeNull();
				expect(element().getAttribute('calculated-translated')).toBe('');
			});
		});

		webDescribe('with value is empty', '<jh-codage value=\'\'></jh-codage>', function(element) {
			it('should handle changes in values', function() {
				expect(element()).not.toBeNull();
				expect(element().shadowRoot.querySelector('#original').textContent).toBe('');
				expect(element().shadowRoot.querySelector('#translating')).toBeNull();
				expect(element().shadowRoot.querySelector('#translated')).toBeNull();
				expect(element().getAttribute('calculated-translated')).toBe('');

				element().setAttribute('value', 'original');

				expect(element().shadowRoot.querySelector('#original')).toBeNull();
				expect(element().shadowRoot.querySelector('#translating').attributes.title.textContent).toEqual('original');
				expect(element().shadowRoot.querySelector('#translated').textContent).toEqual('codage');
				expect(element().getAttribute('calculated-translated')).toBe('codage');
			});
		});
	});
});
