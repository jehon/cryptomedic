/* global XInputPicture */

exports.command = function(selector, value, callback) {
	this.waitForElementVisible(selector);
	this.assert.visible(selector);

	this.execute(function(selector, attributeName, attributeValue) {
		let el = document.querySelector(selector);
		el._generatePreview(XInputPicture.dataURItoBlob(value, 'test.jpg'));
		return true;
	}, [ selector, value ],
	(result) => {
		if (typeof callback === 'function') {
			this[callback](result);
		}
	});

	this.pause(200);
    
	return this;
};
