/* export date2Display */

let date2Display = (function() {
	const Invalid = 'Invalid date';
	function date2Display(date) {

		if (date == null) {
			return '';
		}
		let dateObj = date;
		if (typeof(date) == 'string') {
			if (date == '') {
				return '';
			}
			dateObj = new Date(date);
		}
		if (isNaN(dateObj.getFullYear())) {
			return Invalid;
		}
		return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
	}

	date2Display.invalid = Invalid;
	return date2Display;
}());
