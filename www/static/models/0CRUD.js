
class CRUD {
  static getBaseUrl() {
    throw "getBaseUrl is not implemented";
  }

	static list(network) {
		return network.start()
      .requestWithGet()
      .requestToUrl(this.getBaseUrl());
	}

  constructor(data = {}) {
    if (data) {
      Object.assign(this, data);
    }
  }

  validate(res) {
    if (!res) {
      res = {};
    }
    return res;
  }
}
