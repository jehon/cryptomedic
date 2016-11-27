
let OneRequest = (function() {

  //************************************************************************************/
  //**** Body builders according to method
  function bodyBuilderGet(options) {
    return Object.keys(options.data).map(function (keyName) {
      return encodeURIComponent(keyName) + '=' + encodeURIComponent(options.data[keyName]);
    }).join('&')
  }

  function bodyBuilderPost(options) {
    var body = new FormData();
    for(var a in options.data) {
      body.append(a, options.data[a]);
    }
    return body;
  }

  function bodyBuilderPut(options) {
    if (!options.headers) {
      options.headers = {};
    }
    // Thanks to: http://blog.gospodarets.com/fetch_in_action/
    options.headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    return bodyBuilderGet(options);
  }

  //************************************************************************************/
  /*
   * Proxy to new Request(...).fetch
   *
   * Use get() and post() preferably.
   *
   * @var {Function} executeRawRequest
   * @see internals.get
   * @see internals.post
   *
   */
  function executeRawRequest(method, relativeUrl, body, options) {
    options.fullUrl = '/api/v1.0/' + relativeUrl;

    return fetch(new Request(options.fullUrl, {
      method: method,
      credentials: 'include',
      body: body
    }));
  }

  //************************************************************************************/
  // ***** Public API **********
  return class OneRequest {
    constructor(options = {}) {
      this.options = Object.assign({},  {
        context: "Undefined",
        errorMsg: null,
        data: false,
        listOfAcceptableHttpStatusCode: [ ],

        onSuccess: (response) => { return response; },
        onError: (error) => { throw error; },
      }, options);

      this.fired = false;
    }

    setContext(context) {
      this.options.context = context;
      if (!this.options.errorMessage) {
        this.options.errorMessage = context;
      }
      return this;
    }

    setErrorMessage(errorMessage) {
      this.options.errorMessage = errorMessage;
      return this;
    }

    setData(data) {
      this.options.data = data;
      return this;
    }

    setListOfAcceptableHttpStatusCode(list) {
      this.options.listOfAcceptableHttpStatusCode = this.options.listOfAcceptableHttpStatusCode.join(list);
      return this;
    }

    addAcceptableHttpStatusCode(code) {
      this.options.listOfAcceptableHttpStatusCode.push(code);
      return this;
    }

    setOnSuccess(onSuccess) {
      this.options.onSuccess = onSuccess;
      return this;
    }

    setOnError(onError) {
      this.options.onError = onError;
      return this;
    }

    get(relativeUrl) {
      this.request = executeRawRequest('GET', relativeUrl + '?' + bodyBuilderGet(this.options), null, this.options);
      return this.treat();
    }

    post(relativeUrl) {
      this.request =  executeRawRequest('POST', relativeUrl, bodyBuilderPost(this.options), this.options);
      return this.treat();
    }

    put(relativeUrl) {
      this.request =  executeRawRequest('PUT', relativeUrl, bodyBuilderPut(this.options), this.options);
      return this.treat();
    }

    treat() {
      return this.request
        // Enrich the objects
        .then(
          response => {
            if (response.ok) {
              // TODO: Treat the _offline record

              return response;
            }

            if (response.options.listOfAcceptableHttpStatusCode.indexOf(response.status) >= 0) {
              // We have an unacceptable error
              return response;
            }

            let message = "Error";
            switch(response.status) {
              case 401: // Not-Authorized - you need to login first
                location.hash = "#/login";
                break;

              case 403: // Forbidden, show a "Not authorized message"
                message = "Forbidden";
                break;

              case 404: // Not found
                message = "Not found";
                break;

              case 500: // Internal server error - let's show a ugly error box to the developper
              default:
                message = "#" + response.status + ": Internal server error";
                console.error("InternalJS.executeRawRequest: ", response);
                break;
            }

            throw message;
          },
          error   => {
            console.error("InternalJS.executeRawRequest/catch: ", error);
            throw "Server unreachable. Please check your network connection.";
          }
        )
        .catch(error => {
          if (this.onError) {
            return this.onError(error);
          }
        })
    }
  }
})();
