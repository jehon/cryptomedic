
/**
 * Launch a fetch request
 *
 * @params init Optional
 *  - method: The request method, e.g., GET, POST.
 *  - headers: Any headers you want to add to your request, contained within a Headers object or ByteString.
 *  - body: Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object. Note that a request using the GET or HEAD method cannot have a body.
 *  - mode: The mode you want to use for the request, e.g., cors, no-cors, or same-origin.
 *  - cache: The cache mode you want to use for the request: default, no-store, reload, no-cache, force-cache, or only-if-cached.
 */
export function myFetch(url, init, data) {
  init = init || {};
  if (!init.method) {
    init.method = "GET";
  }
  init.credentials = "include";

  if (data) {
    if (init.method == "POST") {
      var fd = new FormData();
      for(var a in data) {
        fd.append(a, data[a]);
      }
      init.body = fd;
    } else if (init.method == "PUT") {
      if (!init.headers) {
        init.headers = {};
      }
      // Thanks to: http://blog.gospodarets.com/fetch_in_action/
      init.headers["Content-type"] = "application/x-www-form-urlencoded; charset=UTF-8";
      var serialize = function (data) {
        return Object.keys(data).map(function (keyName) {
          return encodeURIComponent(keyName) + "=" + encodeURIComponent(data[keyName]);
        }).join("&");
      };
      init.body = serialize(data);
    } else {
      url = url + "?";
      for(var d in data) {
        url = url + encodeURIComponent(d) + "=" + encodeURIComponent(data[d]) + "&";
      }
    }
  }

  var req = new Request(url, init);
  return fetch(req).then(function(response) {
    // Response: ok, status, statusText
    if (!response.ok) {
      return Promise.reject(response.status);
    }

    return response.json();
      // .then(function(json) {
      //   return json;
      // });
  });
}

export function myFrontFetch(url, init, data) {
  return myFetch(url, init, data).then(
    function(json) {
      appState().actions.connection.success();
      if (json._offline) {
        return db.storeRecord({ record: json })
          .then(function() { return json; });
      } else {
        return json;
      }
    }, function(httpErrorCode) {
    switch(httpErrorCode) {
      case 401: // unauthorized
        appState().actions.connection.expired();
        server.settings = false;
        location.hash = "#/login";
        break;
      case 403: // forbidden
        appState().actions.connection.failed();
        break;
      case 404: // not found
        appState().actions.connection.serverError();
        break;
      case 500: // internal server error
        appState().actions.connection.serverError();
        break;
      default:
        appState().actions.connection.serverError();
        break;
    }
    return Promise.reject("myFrontFetch error: " + httpErrorCode);
  }
  );
}
