
import '../../app/elements/x-requestor-crud.js';

import { webDescribe, extractPath } from './athelpers.js';

import axios from '../../app/cjs2esm/axios.js'
import MockAdapter from '../../app/cjs2esm/axios-mock-adapter.js'

describe('tests/unit/x-requestor-crud-test.js', function () {
	var mock;

	beforeEach(function () {
		mock = new MockAdapter(axios);

		mock.onGet('/object').reply(200, [1, 2]);
		mock.onPost('/object').reply(200, "post 15");

		mock.onGet('/object/15').reply(200, "get 15");
		mock.onPut('/object/15').reply(200, "put 15");
		mock.onDelete('/object/15').reply(200, "delete 15");
	});

	afterEach(function () {
		mock.restore();
	});

	webDescribe('x-requestor-crud', '<x-requestor-crud relative-url=\'/object\'></x-requestor-crud>', function (element) {
		const testRequest = function (opts, done) {
			return element()
				.request(opts)
				.catch(response => {
					console.error(response);
					done.fail(`in test: url not found '${opts.url}'`);
					throw response;
				});
		};

		const buildResponse = function (result) {
			return Promise.resolve(new Response(JSON.stringify(result), {
				status: 200,
				statusText: 'Ok'
			}));
		};

		it('should list', function (done) {
			const res = [1, 2];
			element().list()
				.then(list => {
					expect(list).toEqual(res);
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});

		it('should create', function (done) {
			const data = { a: 1 };
			element().create(data)
				.then(response => {
					expect(response).toBe("post 15");
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});

		it('should read', function (done) {
			element().read(15)
				.then(response => {
					expect(response).toBe('get 15');
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});

		it('should update', function (done) {
			element().update({ id: 15 })
				.then(response => {
					expect(response).toBe('put 15');
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});

		it('should delete', function (done) {
			element().delete(15)
				.then(response => {
					expect(response).toBe('delete 15');
					done();
				})
				.catch(e => { console.error(e); done.fail(e); });
		});
	});
});
