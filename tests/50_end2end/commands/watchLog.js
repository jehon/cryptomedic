exports.command = function(callback) {
  this.getLog("browser", function(logEntriesArray) {
    logEntriesArray.forEach(function(log) {
     	 console.log("[" + log.level + "] " + log.timestamp + " : " + log.message);
    });
  });
  return this;
};
