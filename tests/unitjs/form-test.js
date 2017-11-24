
describe("form-test", function() {
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

	it("should skip empty values", function(done) {
		form(`
  			<input name='n1' value=''>
  			<input type='radio' name='n2' value='n2val'>
  			<select name='n3'>
  				<option value='n3val1'>
  				<option value='n3val2'>
  			</select>
  			<x-write name='n4' type='list' list='[ "n4val1", "n4val2", "n4val3" ]'></x-write>
  			<x-write-list edit name='n5' type='list' list='[ "n5val1", "n5val2", "n5val3", "n5val4", "n5val5", "n5val6", "n5val7" ]'></x-write-list>
  			<x-inline edit name='n6' type='list' list='[ "n6val1", "n6val2", "n6val3" ]'></x-inline>
  			<x-inline edit name='n7' type='char'></x-inline>
 			`, {
				n3: 'n3val1',
				n4: 'n4val1',
				n5: 'n5val1',
				n6: 'n6val1'
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
        <x-write name='n4' type='list' value='n4val2' list='[ "n4val1", "n4val2", "n4val3" ]'></x-write>
        <x-write-list name='n5' value='n5val2' list='[ "n5val1", "n5val2", "n5val3", "n5val4", "n5val5", "n5val6", "n5val7" ]'></x-write-list>
        <x-inline edit name='n6' value='n6val2'  type='list' list='[ "n6val1", "n6val2", "n6val3" ]'></x-inline>
        <x-inline edit name='n7' value='n7val' type='char'></x-inline>
			`, {
				n1: 'n1val',
				n2: 'n2val',
				n3: 'n3val2',
				n4: 'n4val2',
				n5: 'n5val2',
				n6: 'n6val2',
				n7: 'n7val'
			}, done
		);
	})
})
