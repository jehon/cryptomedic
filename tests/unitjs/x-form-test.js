'use strict';

describe('x-form-test', function() {
	webDescribe("initial", "<x-form></x-form>", function(element) {
		it("should be initialized", function() {
			expect(element()).not.toBeNull();
		})
	});

	webDescribe("with simple inputs", `<x-form>
			<input name='n1'>
			<input name='n2' type='number'>
			<input name='n3' type='date'>
			<input name='n4' type='hidden'>
		</x-form>`, function(element) {

		it("should get empty object", function() {
	 		expect(element().rebuildData()).toEqual({});
		});

		it("should keep initial object", function() {
	 		expect(element().rebuildData({ a: 1 })).toEqual({ a: 1 });
	 		const Test = class {};
	 		const t = new Test();
	 		t.a = 1;
	 		expect(element().rebuildData(t)).toEqual(jasmine.any(Test));
	 		expect(element().rebuildData(t).a).toBe(1);
		});

		it("should fill in the form", function() {
			const values = { n1: 'val1', n2: 123, n3: '2017-01-01', n4: 'val4' };
			element().value = values;
	 		expect(element().rebuildData()).toEqual(values);
		});

	});

	webDescribe("with radios", `<x-form>
  			<input type='radio' name='n' value="val1">
  			<input type='radio' name='n' value="val2">
		</x-form>`, function(element) {

		it("should get empty object", function() {
	 		expect(element().rebuildData()).toEqual({});
		});

		it("should fill in the form", function() {
			const values = { n: 'val1' };
			element().value = values;
	 		expect(element().rebuildData()).toEqual(values);
		});
	});

	webDescribe("with select", `<x-form>
  			<select name='n'>
  				<option value='val1'>
  				<option value='val2'>
  			</select>
		</x-form>`, function(element) {

		it("should get empty object", function() {
	 		expect(element().rebuildData()).toEqual({
	 			n: "val1"
	 		});
		});

		it("should fill in the form", function() {
			const values = { n: 'val1' };
			element().value = values;
	 		expect(element().rebuildData()).toEqual(values);
		});
	});

	/* Special cases */

	webDescribe("with disabled value", `<x-form>
			<input name='n0' disabled value='test'>
		</x-form>`, function(element) {

		it("should not get it", function() {
	 		expect(element().rebuildData()).toEqual({});
		});
	});

	webDescribe("with an invalid name", `<x-form>
			<input name value='test'>
		</x-form>`, function(element) {

		it("should not get it", function() {
	 		expect(element().rebuildData()).toEqual({});
		});
	});

	webDescribe("with not visible element", `<x-form style='display: none'>
			<input name='n1' value='test'>
		</x-form>`, function(element) {

		it("should not get it", function() {
	 		expect(element().rebuildData()).toEqual({});
		});
	});


	webDescribe("with custom elements", `<x-form>
  			<x-write name='n' type='numeric'></x-write>
		</x-form>`, function(element) {
		it("should get empty object", function() {
	 		expect(element().rebuildData()).toEqual({});
		});

		it("should fill in the form", function() {
			const values = { n: 135 };
			element().value = values;
	 		expect(element().rebuildData()).toEqual(values);
		});
	});







	webDescribe("with custom elements", `<x-form>
  			<x-write       name='n4' type='list' list='[ "n4val1", "n4val2", "n4val3" ]'></x-write>
  			<x-write-list  name='n5'             list='[ "n5val1", "n5val2", "n5val3", "n5val4", "n5val5", "n5val6", "n5val7" ]'></x-write-list>
	        <x-inline edit name='n6' type='list' list='[ "n6val1", "n6val2", "n6val3" ]'></x-inline>
  			<x-inline edit name='n7' type='char'></x-inline>
		</x-form>`, function(element) {

		it("should be initialized", function() {
			expect(element()).not.toBeNull();
		});

		// it("should fill in it", function() {
		// 	element().fillIn({
		// 		n1: "n1val",
		// 		n2: "n2val2",
		// 		n3: "n3val2",
		// 		n4: "n4val2",
		// 		n5: "n5val2",
		// 		n6: "n6val2",
		// 		n7: "n7val"
		// 	})
		// })
	});

});
