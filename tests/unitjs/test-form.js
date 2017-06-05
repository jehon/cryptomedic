
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

	fit("should skip empty values", function(done) {
		form(`
  			<input name='n1' value=''>
  			<input type='radio' name='n2' value='n2val'>
			`, {
			}, done
		);
	})

	fit("should extract info from input", function(done) {
		form(`
  			<input name='n1' value='n1val'>
				<input type='radio' name='n2' value='n2val' checked>
			`, {
				n1: 'n1val',
				n2: 'n2val'
			}, done
		);
	})

})

