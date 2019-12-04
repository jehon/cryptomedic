/* global CRUD */

'use strict';

class Price extends CRUD {
	static getBaseUrl() {
		return 'admin/prices';
	}
}
