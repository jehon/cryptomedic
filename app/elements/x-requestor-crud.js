
import XRequestor from './x-requestor.js';
import nullify from '../js/nullify.js';

export default class XRequestorCRUD extends XRequestor {
	static get properties() {
		return {
			relativeUrl: 'String'
		};
	}

	list() {
		return this.requestAndFilter({
			url: this.relativeUrl,
			method: 'GET',
		}).then(response => response.data);
	}

	create(data) {
		return this.requestAndFilter({
			url: this.relativeUrl,
			method: 'POST',
			data: nullify(data)
		}).then(response => response.data);
	}

	read(id) {
		return this.requestAndFilter({
			method: 'GET',
			url: this.relativeUrl + '/' + id
		}).then(response => response.data);
	}

	update(data) {
		return this.requestAndFilter({
			url: this.relativeUrl + '/' + data.id,
			method: 'PUT',
			data: data
		}).then(response => response.data);
	}

	delete(id) {
		return this.requestAndFilter({
			url: this.relativeUrl + '/' + id,
			method: 'DELETE'
		}).then(response => response.data);
	}
}

window.customElements.define('x-requestor-crud', XRequestorCRUD);
