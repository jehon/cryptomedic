
describe('test-jh-script', function() {
	function getFn() {
		let res = `
        if (typeof(this.value) == 'undefined') { 
          this.value = 0;
        }
        this.value++;
        `;
		return res;
	}

	function getFnError() {
		let res = 'let res = 1 / 0;';
		return res;
	}

	webDescribe('should run script', `<jh-script>${getFn()}</jh-script>`, (element) => {
		it('should run', function() {
			expect(element().value).toBe(1);

			element().adapt();

			expect(element().value).toBe(1);
		});
	});

	webDescribe('should run script', `<jh-script disabled=1>${getFn()}</jh-script>`, (element) => {
		it('should not run', function() {
			expect(element().value).toBeUndefined();

			element().removeAttribute('disabled');
			expect(element().value).toBe(1);

			element().setAttribute('disabled', 'true');
			expect(element().value).toBe(1);

			element().removeAttribute('disabled');
			expect(element().value).toBe(2);
		});
	});

	describe('with error handling', function() {
		beforeEach(function() {
			spyOn(console, 'error');
		});

		webDescribe('should display error', '<jh-script>throw "test";</jh-script>', (element) => {
			it('should throw', function() {
				expect(console.error).toHaveBeenCalledTimes(1);
				expect(console.error.calls.argsFor(0)[1]).toBe('test');
			});
		});

	});
});
