
class CRUD {
	constructor(data = {}) {
    	if (data) {
      		Object.assign(this, data);
    	}
  }

  static getBaseUrl() {
    throw "getBaseUrl is not implemented";
  }

	static list(network) {
		return network.start()
      .requestWithGet()
      .requestToUrl(this.getBaseUrl());
	}
}
