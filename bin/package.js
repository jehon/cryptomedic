
// https://developer.mozilla.org/en-US/Marketplace/Options/Self_publishing#Self-publishing_packaged_apps;

// https://www.npmjs.com/package/node-zip
// https://www.npmjs.com/package/jszip

var fs = require('fs');


var archiver = require('archiver');
var archive = archiver.create('zip', {});
var output = fs.createWriteStream(__dirname + '/../package.zip');

archive.on('error', function(err){
  throw err;
});

archive.pipe(output);
archive.directory(__dirname + '/../build/', '/');
archive.finalize();
