
import store from '../js/store.js';
import XWaiting from './x-waiting.js';

export default class XWaitingFolder extends XWaiting {
	constructor() {
		super();
		this.block();
		store.subscribe(() => this._store2folder());
		this._store2folder();
	}

	_store2folder() {
		this.folder = store.getState().folder;
	}

	get folder() {
		return this._folder;
	}

	set folder(folder) {
		this._folder = folder;
		if (this._folder) {
			this.free();
			if (this.isInitialized()) {
				this.adapt();
			}
		} else {
			this.block();
			this.innerHTML = '';
		}
	}
}

window.customElements.define('x-waiting-folder', XWaitingFolder);
