
// TODO: general error handler

const XRequestor = (function() {
    /* Private */
    function filterParameter(fnName, value, allowed) {
        if (allowed.indexOf(value) < 0) {
            throw new Error(`Function ${fnName} allow only [${allowed.join(",")}]. Value not permitted: ${value}`);
        }
    }

    //************************************************************************************/
    //**** Body builders according to method
    /* Private */
    function _bodyBuilderRecurse(body, data, parentKey = false) {
        for (var a in data) {
            const key = (parentKey ? parentKey : '') + a;
            switch (typeof(data[a])) {
                case "object":
                    if (data[a] instanceof File) {
                        body.append(key, data[a], data[a].name);
                        break;
                    }
                    // // TODO: treat array's
                    // if (data[a] instanceof Array) {
                    //     break;
                    // }
                    // Recursively treat object
                    // _bodyBuilderRecurse(body, data[a], key + '.');
                    body.append(key, JSON.stringify(data[a]));
                    break;
                default:
                    body.append(key, data[a]);
                    break;
            }
        }
        return body;
    }

    // /* Private */
    function bodyBuilderUrlEncode(data, self) {
        const uri = _bodyBuilderRecurse(new URLSearchParams(), data).toString();

        let url = self.getOption("request.url");
        if (url.indexOf('?') >= 0) {
            self.setOption("request.url", url + "&" + uri);
        } else {
            self.setOption("request.url", url + "?" + uri);
        }

        return null;
    }

    // /* Private */
    // function bodyBuilderFormDataEncode(data) {
    //     return _bodyBuilderRecurse(new FormData(), data);
    // }

    // /* Private */
    // function bodyBuilderFormUrlEncode(data, self) {
    //     // Thanks to: http://blog.gospodarets.com/fetch_in_action/
    //     self.requestWithHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    //     return _bodyBuilderRecurse(new URLSearchParams(), data).toString();
    // }

    /* Private */
    function bodyBuilderJSONEncode(data, self) {
        self.requestWithHeader("Content-Type", "application/json; charset=UTF-8");
        return JSON.stringify(data);
    }

    //************************************************************************************/
    //**** treat response

    /* Private */
    function responseTransformAsText(response) {
        return response.text().then(text => {
            response.asText = text;
            return response;
        });
    }

    function responseTransformAsJson(response) {
        return responseTransformAsText(response)
            .then(response => {
                if (response.asText.length === 0) {
                    response.asJson = {};
                    return response;
                }
                try {
                    response.asJson = JSON.parse(response.asText);
                    return response;
                } catch (e) {
                    return response;
                }
            });
    }

    //************************************************************************************/
    // ***** Public API **********
    /**
     *
     * General request to any server:
     *
     * 1/ Set the options
     *   - requestAsGet
     *   - requestWithMode
     *   - requestToUrl
     *   - ...
     *
     * 2/ then()
     *   - send a Promise
     *
     * 3/ The results arrive
     *
     */
    const storage = Symbol("storage");

    class FetchFull {
        static get TimeoutException() {
            return class TimeoutException {};
        }

        constructor() {
            this[storage] = {};
            this.setOption("internal.fired", false);
            this.requestWithGet();
        }

        /* Private */
        getStorage() {
            return this[storage];
        }

        /**
         * Private
         *
         * Configuration is not allowed when the request has already been fired
         *
         */
        errorOnFired() {
            if (this.getOption("internal.fired")) {
                throw new Error("Network Request: Already fired " + this.getOption("internal.debugTag", ""));
            }
        }

        /**
         * Private
         *
         * Get an (internal) option
         */
        getOption(name, def = undefined) {
            let opt = this.getStorage();
            if (typeof(def) != "undefined") {
                if (!objectPath.has(opt, name) || (typeof(objectPath.get(opt)) == "undefined")) {
                    objectPath.set(opt, name, def);
                }
            }
            return objectPath.get(opt, name);
        }

        /**
         * Private
         *
         * Set an (internal) option
         */
        setOption(name, value) {
            let opt = this.getStorage();
            objectPath.set(opt, name, value);
        }

        /**
         * Allow every call to be traced in the console
         *
         * @param tag: a tag to ease following the request through the logs
         */
        debug(tag = false) {
            this.setOption("internal.debug", (tag !== false));
            if (tag) {
                this.setOption("internal.debugTag", tag);
            }
            return this;
        }

        /**
         * Private
         *
         * Trace the call (@see debug)
         */
        _trace(...args) {
            if (!this.getOption("internal.debug", false)) {
                return
            }
            let line = ["Fetchfull"];
            if (this.getOption("internal.debugTag", false)) {
                line.push(this.getOption("internal.debugTag"));
            }
            line.push(...args);
            console.log(...line);
        }

        /*********************** Request handling **********************/
        // https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
        /**
         * Set the transformer that will take data to transform it
         * into the body (or the url)
         *
         * This method is mainly use by "requestWithGet", "requestWithPost", ...
         *
         * @return this: to allow chaining
         */
        requestWithBodyBuilder(fn) {
            this.errorOnFired();
            this.setOption("request.bodyBuilder", fn);
            return this;
        }

        /**
         * Tell wether or not the credentials should be included in the request
         *
         * Values: include, same-origin, omit
         *
         * @return this: to allow chaining
         */
        requestWithCredentials(value = "include") {
            this._trace("requestWithCredentials", value);
            this.errorOnFired();
            filterParameter("requestWithCredentials", value, ["include", "same-origin", "omit"]);
            this.setOption("request.options.credentials", value);
            return this;
        }

        /**
         * Set the data that will be posted/getted/putted/... with the request
         * This data will be given to the requestWithBodyBuilder to be transformed
         * into something that "fetch" could understand.
         *
         * @return this: to allow chaining
         */
        requestWithData(data) {
            this._trace("requestWithData", data);
            this.errorOnFired();
            this.setOption("request.options.data", data);
            return this;
        }

        // /**
        //  * Get the data set by requestWithData
        //  *
        //  * @return the data
        //  */
        // getRequestedData() {
        //     return this.getOption("request.options.data", {});
        // }

        // /**
        //  * Add a header to the request.
        //  *
        //  * If the header already exists, add a second value to it.
        //  *
        //  * @param key: the start of the header (eg. Content-Type)
        //  * @param value: the value of the header (eg. "application/json")
        //  *
        //  * @return this: to allow chaining
        //  */
        requestWithHeader(key, value = null) {
            this._trace("requestWithHeader", key, value);
            this.errorOnFired();
            let headers = this.getOption("request.options.headers", new Headers());
            if (value == null) {
                headers.delete(key);
            } else {
                headers.set(key, value);
            }
            this.setOption("request.options.headers", headers);
            return this;
        }

        // /**
        //  * Add all the headers in this map
        //  * Through requestWithHeader
        //  *
        //  * @return this: to allow chaining
        //  */
        // requestWithHeaders(map) {
        //     this._trace("requestWithHeaders", map);
        //     this.errorOnFired();
        //     for (let i of Object.keys(map)) {
        //         this.requestWithHeader(i, map[i]);
        //     }
        //     return this;
        // }

        // /**
        //  * Get the headers already set by the request.
        //  *
        //  * Please note that some other functions could add some headers
        //  * (eg. responseAsJson)
        //  *
        //  * @return the headers as a "Headers" object
        //  */
        // getRequestedHeaders() {
        //     return this.getOption("request.options.headers", {});
        // }

        /**
         * Set the "Verb" of the request (Get/Post/Put/Delete/...)
         *
         * Please use preferably "requestWithGet", "requestWithPost",
         * "requestWithPut", "requestWithDelete" that will set other options too.
         *
         *
         * @return this: to allow chaining
         */
        requestWithMethod(method) {
            this._trace("requestWithMethod", method);
            this.errorOnFired();
            this.setOption("request.options.method", method);
            return this;
        }

        /**
         * Get the method, as set by requestWithMethod
         *
         * @return method
         */
        getRequestedMethod() {
            return this.getOption("request.options.method", "GET");
        }

        /**
         * Set the "CORS" mode of this request
         *
         * Values: cors, no-cors, same-origin, navigate.
         *
         * @return this: to allow chaining
         */
        requestWithMode(value) {
            this._trace("requestWithMode", value);
            this.errorOnFired();
            filterParameter("requestWithMode", value, ["cors", "no-cors", "same-origin", "navigate"]);
            this.setOption("request.options.mode", value);
            return this;
        }

        /**
         * Set a time-out on the request.
         *
         * By default a time-out of 30 seconds is programmed.
         *
         * @param: the time-out in SECONDS.
         *
         * @return this: to allow chaining
         */
        requestWithTimeOut(timeOutSecs) {
            this._trace("requestWithTimeOut (secs)", timeOutSecs);
            this.errorOnFired();
            this.setOption("request.timeOutSecs", timeOutSecs);
            return this;
        }

        /**
         * Get the value set by requestWithTimeout or the default value.
         *
         * The return value is in seconds.
         *
         * @return the time-out (including the default value).
         */
        getRequestedTimeOut() {
            return this.getOption("request.timeOutSecs", 30);
        }

        /**
         * The destination URL
         *
         * @return this: to allow chaining
         */
        requestToUrl(url) {
            this._trace("requestToUrl", url);
            this.errorOnFired();
            this.setOption("request.url", url);
            return this;
        }

        /**
         * The URL set by requestToUrl.
         *
         * @return this: to allow chaining
         */
        getRequestedUrl() {
            return this.getOption("request.url");
        }

        /**
         * Make a "get" request.
         *
         * This function set various options
         *
         * @return this: to allow chaining
         */
        requestWithGet() {
            this._trace("requestWithGet");
            this.errorOnFired();
            this.requestWithMethod("GET");
            this.requestWithBodyBuilder(bodyBuilderUrlEncode);
            return this;
        }

        // /**
        //  * Make a "post" request.
        //  *
        //  * This function set various options
        //  *
        //  * @return this: to allow chaining
        //  */
        // requestWithPost() {
        //     this._trace("requestWithPost");
        //     this.errorOnFired();
        //     this.requestWithMethod("POST");
        //     this.requestWithBodyBuilder(bodyBuilderFormDataEncode);
        //     return this;
        // }

        // /**
        //  * Make a "post" request.
        //  *
        //  * This function set various options
        //  *
        //  * @return this: to allow chaining
        //  */
        // requestWithPostWithJSONBody() {
        //     this._trace("requestWithPostWithJSONBody");
        //     this.errorOnFired();
        //     this.requestWithMethod("POST");
        //     this.requestWithBodyBuilder(bodyBuilderJSONEncode);
        //     return this;
        // }

        // /**
        //  * Make a "put" request.
        //  *
        //  * This function set various options
        //  *
        //  * @return this: to allow chaining
        //  */
        // requestWithPut() {
        //     this._trace("requestWithPut");
        //     this.errorOnFired();
        //     this.requestWithMethod("PUT");
        //     this.requestWithBodyBuilder(bodyBuilderFormUrlEncode);
        //     return this;
        // }

        /**
         * Make a "put" request.
         *
         * This function set various options
         *
         * @return this: to allow chaining
         */
        requestWithPutWithJSONBody() {
            this._trace("requestWithPutWithJSONBody");
            this.errorOnFired();
            this.requestWithMethod("PUT");
            this.requestWithBodyBuilder(bodyBuilderJSONEncode);
            return this;
        }

        // /**
        //  * Make a "delete" request.
        //  *
        //  * This function set various options
        //  *
        //  * @return this: to allow chaining
        //  */
        // requestWithDelete() {
        //     this._trace("requestWithDelete");
        //     this.errorOnFired();
        //     this.requestWithPut();
        //     this.requestWithMethod("DELETE");
        //     return this;
        // }

        // /**
        //  * Make a "delete" request.
        //  *
        //  * This function set various options
        //  *
        //  * @return this: to allow chaining
        //  */
        // requestWithDeleteWithJSONBody() {
        //     this._trace("requestWithDeleteWithJSONBody");
        //     this.errorOnFired();
        //     this.requestWithPutWithJSONBody();
        //     this.requestWithMethod("DELETE");
        //     return this;
        // }

        /*********************** Response handling **********************/
        /**
         * Request that the result is parsed as JSON.
         *
         * This will setup some options to ease usage
         *
         * @return this: to allow chaining
         */
        responseAsJson() {
            this._trace("responseAsJson");
            this.errorOnFired();
            this.requestWithHeader("Accept-Type", "application/json");
            this.setOption("response.transform", responseTransformAsJson);
            return this;
        }

        /*********************** Execution *************************/
        /**
         * Alias of "fire" for thoses who likes Promises
         *
         */
        then(fn) {
            let p = this.fire();
            if (fn) {
                p = p.then(fn);
            }
            return p;
        }

        /**
         * Start the request to the server and handle the response according to
         * all options above.
         */
        fire() {
            this._trace("Firing request");

            this.errorOnFired();

            let request = this.getOption("request", {});

            // These must work before setting "fired", since they use the option api
            let bodyBuilder = this.getOption("request.bodyBuilder");
            if (bodyBuilder && this.getOption("request.options.data")) {
                this.setOption("request.options.body", bodyBuilder(this.getOption("request.options.data"), this));
            }

            // Now, we close the "setOption" to start the request...
            this.setOption("internal.fired", true);

            let firstwin = false;

            return Promise.race([
                // **** Timeout protection ****
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        /* istanbul ignore if */
                        if (firstwin) {
                            return;
                        }
                        firstwin = true;
                        this._trace("Time-out detected after", this.getRequestedTimeOut, "secs");

                        const toe = new (FetchFull.TimeoutException)();
                        toe.message = "TimeOut: " + this.getRequestedTimeOut() + " secs";
                        toe.timeoutSecs = this.getRequestedTimeOut();
                        reject(toe);
                    }, this.getRequestedTimeOut() * 1000)
                }),
                // **** Real request ****
                fetch(new Request(
                    request.url,
                    request.options))
                .catch((response) => {
                    /* istanbul ignore if */
                    if (firstwin) {
                        throw "Timeout " + this.getOption("internal.debugTag", "");
                    }
                    firstwin = true;
                    this._trace("Exception received after fetch");
                    throw response;
                })
                .then((response) => {
                    /* istanbul ignore if */
                    if (firstwin) {
                        throw "Timeout " + this.getOption("internal.debugTag", "");
                    }
                    firstwin = true;
                    this._trace("Response received", response);
                    let transform = this.getOption("response.transform");
                    let finished = Promise.resolve(response);

                    if (transform) {
                        finished = finished.then(response => {
                            return transform(response);
                        });
                    }
                    return finished;
                })
            ]);
        }
    }


    const error        = Symbol("error");
    const waiting      = Symbol("waiting");
    const errorMsg     = Symbol("errorMsg");
    const errorContent = Symbol("errorContent");

    class XRequestor extends JHElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
            <span>
                <x-overlay closable z-index=20 >
                    <h1 id='errorMsg'></h1>
                    <div id='errorContent'></div>
                </x-overlay>
                <x-waiting>
                    <slot></slot>
                </x-waiting>
            </span>`;

            this[waiting]      = this.shadowRoot.querySelector("x-waiting");
            this[error]        = this.shadowRoot.querySelector("x-overlay");
            this[errorMsg]     = this.shadowRoot.querySelector("#errorMsg");
            this[errorContent] = this.shadowRoot.querySelector("#errorContent");

            this[waiting].free();
            this[error].free();
        }

        isRequesting() {
            return this[waiting].isBlocked();
        }

        isFailed() {
            return this[error].isBlocked();
        }

        request({ url = "/", data = {}, method = "GET", timeout = 30 } = {}) {
            this[waiting].block();

            if (url[0] != "/") {
                url = "/api/" + API_VERSION + "/" + url;
            }

            const fetchfull = new FetchFull();
            fetchfull.requestWithCredentials("include");
            fetchfull.requestToUrl(url);
            fetchfull.requestWithData(data);
            fetchfull.responseAsJson();
            fetchfull.requestWithTimeOut(timeout);

            if (method == "GET") {
                fetchfull.requestWithGet();
            } else {
                fetchfull.requestWithPutWithJSONBody();
                fetchfull.requestWithMethod(method);
            }

            return fetchfull.then(response => {
                this[waiting].free();
                return response;
            })
            .catch(errorObj => {
                this[waiting].free();
                this[error].block();
                // Fill in the overlay
                this.showFailure(errorObj);
                throw errorObj;
            });
        }

        showFailure(message) {
            this[waiting].free();
            this[error].block();
            this[errorMsg].innerHTML = "Network error";
            if (typeof(message) == "object") {
                let html = "<table style='width: 300px'>";
                if (message instanceof Response) {
                    if (message.status) {
                        html += `<tr><td>Status code</td><td>${message.status}</td></tr>`;
                        switch(message.status) {
                            case 404:
                                this[errorMsg].innerHTML = "Not found";
                                html += `<tr><td>Message</td><td>The element you are looking was not found.</td></tr>`;
                                break;
                            case 500:
                                this[errorMsg].innerHTML = "Internal Server Error";
                                html += `<tr><td>Message</td><td>An error occured on the server. Please try again. If the problem persist, please report it.</td></tr>`;
                                break;
                            default:
                                this[errorMsg].innerHTML = "Error";
                                html += `<tr><td>Message</td><td>${message.statusMessage}</td></tr>`;
                                break;
                        }
                    } else {
                        if (message.statusMessage) {
                            html += `<tr><td>Message</td><td>${message.statusMessage}</td></tr>`;
                        }
                    }
                } else if (message instanceof TypeError) {
                    this[errorMsg].innerHTML = "Network Error";
                    html += `<tr><td>Message</td><td>
                    Something went very wrong on your network. Please check:<br>
                    <ul>
                        <li>that you have an internet connection</li>
                        <li>that your connection is really working</li>
                    </ul>
                    In other case, please reload the page and try again..
                    <a href="javascript:window.location.reload()">Reload the page here</a></td></tr>`;
                } else {
                    // Complex message
                    Object.keys(message).forEach(k => {
                        // Part message in a table
                        html += `<tr><td>${k}</td><td>${message[k]}</td></tr>`;
                    })
                }
                html += "</table>";
                this[errorContent].innerHTML = html;
            } else {
                // String message
            }
        }
    }

    window.customElements.define('x-requestor', XRequestor);

    return XRequestor;
})();
