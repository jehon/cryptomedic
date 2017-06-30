
class CRUD {
  static getBaseUrl() {
    throw "getBaseUrl is not implemented";
  }

	static list(network) {
		return network.start()
      .requestWithGet()
      .requestToUrl(this.getBaseUrl())
      ;
	}

  static create(network, data) {
    return network.start()
      .requestWithPost()
      .requestToUrl(this.getBaseUrl())
      .requestWithData(data)
      ;
  }

  static remove(network, id) {
    return network.start()
      .requestWithDelete()
      .requestToUrl(this.getBaseUrl() + '/' + id)
      ;
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
