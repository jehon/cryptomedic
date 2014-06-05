"use strict";

function DataMissingException(data) {
    this.message = "Missing "  + (data || "some data");
    this.data = data;
}
DataMissingException.prototype = new Error();
