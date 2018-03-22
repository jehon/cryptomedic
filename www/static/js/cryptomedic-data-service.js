(function() {
	let patientFolderCache = new TimedMap(15 * 60);

	class CryptomedicDataService extends XRequestor {
		/**************************/
		/*** Patient            ***/
		/**************************/
		searchForPatients(params) {
			return this.requestAndFilter({ url: 'folder' , data: params })
				.then(response => {
					const data = response.asJson;
					const list = [];
					for (const i in data) {
						list.push(new Patient(data[i]));
					}
					return list;
				});
		}

		checkReference(year, order) {
			return this.request({ url: 'reference/' + year + '/' + order })
				.then(response => {
					if (response.ok) {
						let f = new Folder(response.asJson.folder);
						patientFolderCache.set(response.asJson.id, f);
						return response.asJson;
					}
					if (response.status == 404) {
						return false;
					}
					this.showFailure(response);
				});
		}

		createReference(year, order) {
			store.dispatch({ type: ACT_FOLDER_INVALIDATE });

			return this.requestAndFilter({ url: 'reference', method: 'POST', data: {
				'entryyear': year,
				'entryorder': order
			}})
				.then(response => {
					let f = new Folder(response.asJson.folder);
					patientFolderCache.set(response.asJson.id, f);
					store.dispatch({ type: ACT_FOLDER_STORE, payload: f });
					return response.asJson;
				});
		}

		getFolder(id) {
			store.dispatch({ type: ACT_FOLDER_INVALIDATE });

			let f = patientFolderCache.get(id);
			if (f != null) {
				store.dispatch({ type: ACT_FOLDER_STORE, payload: f });
				return Promise.resolve(f);
			}

			return this.requestAndFilter({ url: `folder/Patient/${id}` })
				.then(response => {
					let f = new Folder(response.asJson.folder);
					store.dispatch({ type: ACT_FOLDER_STORE, payload: f });
					patientFolderCache.set(f.getId(), f);
					return f;
				});
		}

		/**************************/
		/*** Patient - File     ***/
		/**************************/

		createOrSaveFile(data) {
			if (data.id) {
				return this.saveFile(data);
			}
			return this.createFile(data);
		}

		createFile(data) {
			store.dispatch({ type: ACT_FOLDER_INVALIDATE });
			return this.requestAndFilter({ url: 'fiche/' + data.getServerRessource(), method: 'POST', data: nullify(data) })
				.then(response => {
					let f = new Folder(response.asJson.folder);
					f.setHeader('newKey', response.asJson.newKey);
					patientFolderCache.set(f.getId(), f);
					store.dispatch({ type: ACT_FOLDER_STORE, payload: f });
					return f;
				});
		}

		saveFile(data) {
			store.dispatch({ type: ACT_FOLDER_INVALIDATE });
			return this.requestAndFilter({ url: 'fiche/' + data.getServerRessource() + '/' + data['id'], method: 'PUT', data: nullify(data) })
				.then(response => {
					let f = new Folder(response.asJson.folder);
					patientFolderCache.set(f.getId(), f);
					store.dispatch({ type: ACT_FOLDER_STORE, payload: f });
					return f;
				});
		}

		deleteFile(data) {
			store.dispatch({ type: ACT_FOLDER_INVALIDATE });
			return this.requestAndFilter({ url: 'fiche/' + data.getServerRessource() + '/' + data['id'], method: 'DELETE' })
				.then(response => {
					let f = new Folder(response.asJson.folder);
					patientFolderCache.set(f.getId(), f);
					store.dispatch({ type: ACT_FOLDER_STORE, payload: f });
					return f;
				});
		}

		unlockFile(data) {
			store.dispatch({ type: ACT_FOLDER_INVALIDATE });
			return this.requestAndFilter({ url: 'fiche/' + data.getServerRessource() + '/unlock/' + data['id'] })
				.then(response => {
					let f = new Folder(response.asJson.folder);
					patientFolderCache.set(f.getId(), f);
					store.dispatch({ type: ACT_FOLDER_STORE, payload: f });
					return f;
				});
		}

		/***********************/
		/*** Report          ***/
		/***********************/

		getReport(reportName, data) {
			return this.requestAndFilter({ url: 'reports/' + reportName, data: nullify(data) })
				.then(response => response.asJson);
		}

		/***********************/
		/*** User management ***/
		/***********************/

		usersList() {
			return this.requestAndFilter({ url: 'users' })
				.then(response => response.asJson);
		}

		userAdd(user) {
			return this.requestAndFilter({ url: 'users', method: 'POST', data: nullify(user) })
				.then(response => response.asJson);
		}

		userDelete(id) {
			return this.requestAndFilter({ url: 'users/' + id, method: 'DELETE' })
				.then(response => response.asJson);
		}

		userUpdate(user) {
			return this.requestAndFilter({ url: 'users/' + user.id, method: 'PUT', data: user })
				.then(response => response.asJson);
		}

		userPassword(id, pwd) {
			return this.requestAndFilter({ url: 'users/password/' + id, method: 'POST', data: { password: pwd }})
				.then(response => response.asJson);
		}
	}

	window.customElements.define('cryptomedic-data-service', CryptomedicDataService);
})();
