
describe('tests/unit/x-requestor-crud-test.js', function() {
	webDescribe('x-requestor-crud', '<x-requestor-crud relative-url=\'/object\'></x-requestor-crud>', function(element) {
		const buildResponse = function(result) { 
			return Promise.resolve(new Response(JSON.stringify(result), {
				status: 200,
				statusText: 'Ok'
			}));
		};

		it('should list', function(done) {
			const res = [ 1, 2 ];
			spyOn(window, 'fetch').and.callFake((request) => {
				expect(request.method).toBe('GET');
				expect(extractPath(request.url)).toBe('/object?');
				return buildResponse(res);
			});
			element().list().then(result => {
				expect(result).toEqual(res);
				done();
			});
		});

		it('should create', function(done) {
			const data = { a: 1 };
			spyOn(window, 'fetch').and.callFake((request) => {
				expect(request.method).toBe('POST');
				expect(extractPath(request.url)).toBe('/object');
				// TODO: check the body
				return buildResponse();
			});
			element().create(data).then(result => {
				done();
			});
		});

		it('should read', function(done) {
			spyOn(window, 'fetch').and.callFake((request) => {
				expect(request.method).toBe('GET');
				expect(extractPath(request.url)).toBe('/object/15?');
				return buildResponse();
			});
			element().read(15).then(result => {
				done();
			});
		});

		it('should update', function(done) {
			spyOn(window, 'fetch').and.callFake((request) => {
				expect(request.method).toBe('PUT');
				expect(extractPath(request.url)).toBe('/object/15');
				// TODO: check the body
				return buildResponse();
			});
			element().update({ id: 15 }).then(result => {
				done();
			});
		});

		it('should delete', function(done) {
			spyOn(window, 'fetch').and.callFake((request) => {
				expect(request.method).toBe('DELETE');
				expect(extractPath(request.url)).toBe('/object/15');
				return buildResponse();
			});
			element().delete(15).then(result => {
				done();
			});
		});
	});
});
