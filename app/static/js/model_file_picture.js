"use strict";

application.models.Picture = application.models.File.extend({
  "init" : function(data, folder) {
    this._super(data, folder);
    if (!data) {
      this._type = "Picture";
    }
  },
  "validate" : function(res) {
    res = this._super(res);
    if (!this.fileContent && !this.file) {
      res.pictureRequired = true;
    }
    return res;
  }
});
