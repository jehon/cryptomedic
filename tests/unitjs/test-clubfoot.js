
describe("ClubFoot", function() {
	it("should give the correct model", function() {
		let b = new ClubFoot();

		expect(b.getModel()).toBe("ClubFoot");
		expect(b.getServerRessource()).toBe("clubfeet");
	});

});
