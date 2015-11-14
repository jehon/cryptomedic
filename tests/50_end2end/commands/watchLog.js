exports.command = function(dropThem, callback) {
  dropThem = dropThem  || false;
  this.getLog('browser', function(logEntriesArray) {
  	if (!dropThem) {
      logEntriesArray.forEach(function(log) {
       	console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
      });
  	}
  });
  return this; // allows the command to be chained.
};
