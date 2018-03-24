/* eslint-env jasmine */
/* global webDescribe, JHElement */
/* global ClubFoot */

describe('ClubFoot', function() {
	it('should give the correct model', function() {
		let b = new ClubFoot();

		expect(b.getModel()).toBe('ClubFoot');
		expect(b.getServerRessource()).toBe('clubfeet');
	});

});
