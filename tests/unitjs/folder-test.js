'use strict';
/* global loadReference, Folder, Patient, OtherConsult, RicketConsult, Appointment, Bill, Payment, Picture */

describe('test-folder', function() {
	beforeEach(() => {
		this.f = new Folder(loadReference('FolderTest.test1.json').folder);
		expect(this.f).toEqual(jasmine.any(Folder));
	});

	it('sould instanciate folder', () => {
		let f = new Folder();
		expect(this.f).toEqual(jasmine.any(Folder));
		expect(f).toEqual(jasmine.any(Folder));
		expect(f.getPatient()).toEqual(jasmine.any(Patient));
		expect(f.getId()).toEqual(-1);
	});

	it('should have loaded Mock data', () => {
		expect(this.f).toEqual(jasmine.any(Folder));
		expect(this.f.getPatient()).toEqual(jasmine.any(Patient));
		expect(this.f.getId()).toBe('1');
	});

	it('should instanciate classes', () => {
		expect(this.f.getPatient()).toEqual(jasmine.any(Patient));
		expect(this.f.getPatient().id).toBe(1);

		expect(Folder.create(this.f, 'Appointment',   {})).toEqual(jasmine.any(Appointment));
		expect(Folder.create(this.f, 'Bill',          {})).toEqual(jasmine.any(Bill));
		expect(Folder.create(this.f, 'ClubFoot',      {})).toEqual(jasmine.any(ClubFoot));
		expect(Folder.create(this.f, 'OtherConsult',  {})).toEqual(jasmine.any(OtherConsult));
		expect(Folder.create(this.f, 'Payment',       {})).toEqual(jasmine.any(Payment));
		expect(Folder.create(this.f, 'Picture',       {})).toEqual(jasmine.any(Picture));
		expect(Folder.create(this.f, 'RicketConsult', {})).toEqual(jasmine.any(RicketConsult));
		expect(Folder.create(this.f, 'Surgery',       {})).toEqual(jasmine.any(Surgery));
 
		expect(() => Folder.create(this.f, 'AnythingInvalid', {})).toThrow();
	});

	it('should query specific element (Otherconsult 1)', () => {
		expect(this.f.getByTypeAndId(OtherConsult, 1)).toEqual(jasmine.any(OtherConsult));
		expect(this.f.getByTypeAndId(OtherConsult, 1).id).toBe(1);
	});

	it('should return null if element is not found (Otherconsult 0)', () => {
		expect(this.f.getByTypeAndId(OtherConsult, 0)).toBeNull();
	});

	it('should give patient related files', () => {
		let list = this.f.getFilesRelatedToPatient();
		expect(list.length).toBe(5);

		list.forEach(e => {
			expect(e.getPatient().id).toBe(1);
		});

		let i = -1;
		i++;
		expect(list[i]).toEqual(jasmine.any(Picture));
		expect(list[i].id).toBe(2);
		expect(this.f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

		i++;
		expect(list[i]).toEqual(jasmine.any(RicketConsult));
		expect(list[i].id).toBe(13);
		expect(this.f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

		i++;
		expect(list[i]).toEqual(jasmine.any(Bill));
		expect(list[i].id).toBe(1);
		expect(this.f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

		i++;
		expect(list[i]).toEqual(jasmine.any(Appointment));
		expect(list[i].id).toBe(2);
		expect(this.f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

		i++;
		expect(list[i]).toEqual(jasmine.any(OtherConsult));
		expect(list[i].id).toBe(1);
		expect(this.f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

		// And out of bounds...
		expect(this.f.getFilesRelatedToPatient(1000)).toBeNull();

	});

	it('should give bill related files', () => {
		let list = this.f.getFilesRelatedToBill(1);
		expect(list.length).toBe(1);

		let i = -1;
		i++;
		expect(list[i]).toEqual(jasmine.any(Payment));
		expect(list[i].id).toBe(3);
		expect(list[i].bill_id).toBe(1);
	});

	it('should kepp extra data', () => {
		this.f.setHeader('newKey', 14);
		expect(this.f.getHeader('newKey')).toBe(14);
	});

	describe('should order files correctly', function() {
		const resEqual  = (a, b) => { expect(Folder.ordering(a, b)).toBe(0); };
		const resFirst  = (a, b) => {
			expect(Folder.ordering(a, a)).toBe(0);
			expect(Folder.ordering(b, b)).toBe(0);

			expect(Folder.ordering(a, Object.assign({}, a))).toBe(0);
			expect(Folder.ordering(b, Object.assign({}, b))).toBe(0);

			expect(Folder.ordering(a, b)).toBeLessThan(0);
			expect(Folder.ordering(b, a)).toBeGreaterThan(0);
		};
		const build = (basis, data, model = 'anything') => {
			return Object.assign({}, basis, data, { getModel: function() { return model ; }});
		};

		it('should order about id', function() {
			const basis = {};
			const o1 = build(basis, {});
			const o2 = build(basis, { id: '2' });
			const o3 = build(basis, { id: '1' });

			resFirst(o1, o2);
			resFirst(o1, o3);
			resFirst(o2, o3);

			// Test string completely...
			resFirst(build(basis, { id: '25' }), o2);
			resFirst(build(basis, { id: '25' }), build(basis, { id: '20' }));
			resFirst(build(basis, { id: '25' }), build(basis, { id: '3' }));
		});

		it('should order about getModel', function() {
			const basis = {};
			const o1 = build(basis, {}, 'a');
			const o2 = build(basis, {}, 'b');
			const o3 = build(basis, {}, 'c');

			resFirst(o1, o2);
			resFirst(o1, o3);
			resFirst(o2, o3);

			// If id is present at one side, it take precedence...
			resFirst(o2, build({ id: '25' }, 'a'));
		});

		it('should order about Date', function() {
			const basis = {};
			const o1 = build(basis, {});
			const o2 = build(basis, { Date: '2010-01-01' });
			const o3 = build(basis, { Date: '2000-01-01' });

			resFirst(o1, o2);
			resFirst(o1, o3);
			resFirst(o2, o3);
		});

		it('should order about created_at', function() {
			const basis = { id: '1' };
			const o1 = build({});
			const o2 = build(basis, { created_at: '2010-01-01' });
			const o3 = build(basis, { created_at: '2000-01-01' });

			resFirst(o1, o2);
			resFirst(o1, o3);
			resFirst(o2, o3);
		});

		it('should new > date > model > id', function() {
			const basis = {};
			const o1 = build(basis, {});
			const o2 = build(basis, { Date: '2000-01-01' });
			const o3 = build(basis, { id: '25' }, 'a');
			const o4 = build(basis, { id: '25', Date: '2000-01-01' });

			resFirst(o1, o2);
			resFirst(o1, o3);
			resFirst(o2, o3);
			resFirst(o3, o4);
		});
	});
});