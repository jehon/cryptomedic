test("jehon library", function() {
	ok(typeof(jehon) != "undefined", "Loading jehon library");
	QUnit.assert.tableCell("1", "2", "table cell test");
});

function qbehavior_nextPage() {
	return "/";
}
