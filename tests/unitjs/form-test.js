
describe("test-form", function() {
	let i = 0;

	function form(html = "", data = {}, done) {
		let v = i++
	  return testComponent(`<form id='testid${v}'>${html}</forms>`).then(el => {
  		expect(el).not.toBeNull();
  		let res = formGetContent(`#testid${v}`, {});

  		expect(res).toEqual(data);

  		el.testDone();
  		done();
  	})
	}

// TODO: test select, x-write-list

	it("should skip empty values", function(done) {
		form(`
  			<input name='n1' value=''>
  			<input type='radio' name='n2' value='n2val'>
  			<select name='n3'>
  				<option value='n3val1'>
  				<option value='n3val2'>
  			</select>
  			<x-write-list name='n4' list='[ "n4val1", "n4val2", "n4val3" ]'></x-write-list>
  			<x-write-list name='n4' list='[ "n4val1", "n4val2", "n4val3", "n4val4", "n4val5", "n4val6", "n4val7" ]'></x-write-list>
			`, {
				n3: 'n3val1',
				n4: 'n4val1'
			}, done
		);
	})

	it("should extract info from input", function(done) {
		form(`
  			<input name='n1' value='n1val'>
				<input type='radio' name='n2' value='n2val' checked>
  			<select name='n3'>
  				<option value='n3val1'>
  				<option value='n3val2' selected>
  			</select>
  			<x-write-list name='n4' value='n4val2' list='[ "n4val1", "n4val2", "n4val3" ]'></x-write-list>
  			<x-write-list name='n5' value='n5val2' list='[ "n5val1", "n5val2", "n5val3", "n5val4", "n5val5", "n5val6", "n5val7" ]'></x-write-list>
			`, {
				n1: 'n1val',
				n2: 'n2val',
				n3: 'n3val2',
				n4: 'n4val2',
				n5: 'n5val2'
			}, done
		);
	})

})
