
import '../../app/elements/x-requestor-crud.js';

import { webDescribe } from './athelpers.js';

import XRequestor from '../../app/elements/x-requestor.js';

describe('tests/unit/x-requestor-crud-test.js', function () {
	webDescribe('x-requestor-crud', '<x-requestor-crud relative-url=\'/object\'></x-requestor-crud>', function (element) {
		it('should list', function (done) {
			const data = [1, 2];
			spyOn(XRequestor.prototype, 'request').and.callFake((opts) => {
				expect(opts.url).toBe('/object');
				expect(opts.method).toBe('GET');
				return Promise.resolve({ data });
			});
			element().list()
				.then(list => {
					expect(list).toEqual(data);
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});

		it('should create', function (done) {
			const data = { a: 1 };
			spyOn(XRequestor.prototype, 'request').and.callFake((opts) => {
				expect(opts.url).toBe('/object');
				expect(opts.method).toBe('POST');
				return Promise.resolve({ data });
			});
			element().create(data)
				.then(response => {
					expect(response).toBe(data);
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});

		it('should read', function (done) {
			const data = { a: 1 };
			spyOn(XRequestor.prototype, 'request').and.callFake((opts) => {
				expect(opts.url).toBe('/object/15');
				expect(opts.method).toBe('GET');
				return Promise.resolve({ data });
			});

			element().read(15)
				.then(response => {
					expect(response).toBe(data);
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});

		it('should update', function (done) {
			const data = { a: 1 };
			spyOn(XRequestor.prototype, 'request').and.callFake((opts) => {
				expect(opts.url).toBe('/object/15');
				expect(opts.method).toBe('PUT');
				expect(opts.data.id).toBe(15);
				expect(opts.data.label).toBe('test');
				return Promise.resolve({ data });
			});

			element().update({ id: 15, label: 'test' })
				.then(response => {
					expect(response).toBe(data);
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});

		it('should delete', function (done) {
			spyOn(XRequestor.prototype, 'request').and.callFake((opts) => {
				expect(opts.url).toBe('/object/15');
				expect(opts.method).toBe('DELETE');
				return Promise.resolve({ data: true });
			});

			element().delete(15)
				.then(response => {
					expect(response).toBe(true);
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});
	});
});
