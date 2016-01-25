
// https://developer.mozilla.org/en-US/Marketplace/Options/Self_publishing#Self-publishing_packaged_apps;

// https://www.npmjs.com/package/node-zip
// https://www.npmjs.com/package/jszip

var fs = require('fs');
var fse = require('fs-extra');
var archiver = require('archiver');
require('es6-object-assign').polyfill();

function create(path, manifest) {
  /**
   * Function to create a package based on 'build' directory and a given @param manifest
   * into @param path
   */
  var archive = archiver.create('zip', {});

  archive.on('error', function(err){
    throw err;
  });

  archive.directory(__dirname + '/../build/', '/');
  archive.pipe(fs.createWriteStream(path +  'package.zip'));

  archive.append(JSON.stringify(manifest), { name: 'manifest.webapp' });
  archive.finalize();

  var minimanifest = {
    name          : manifest.name,
    package_path  : manifest.package_path,
    developer     : manifest.developer
  };
  fs.writeFileSync(path + 'manifest.webapp', JSON.stringify(minimanifest));
}

// Add the not integrated sources
fse.copySync(__dirname + '/../app/static/', __dirname + '/../build/static');
fse.copySync(__dirname + '/../app/bower_components/', __dirname + '/../build/bower_components/');

// Default manifest
var manifest = {
  name           : 'Cryptomedic',
  description    : 'Cryptomedic patient management',
  launch_path    : '/index.html',
  icons          : {
    '512'        : '/icon-512.png',
    '128'        : '/icon-128.png'
  },
  package_path   : 'http://www.cryptomedic.org/cryptomedic/build/package.zip',
  developer      : {
    name         : 'Jean Honlet',
    url          : 'https://github.com/jehon/'
  },
  default_locale : 'en',
  chrome         : {
    navigation   : true
  }
};

// Make the two instances
create(__dirname + '/../tmp/', Object.assign({},
  manifest,
  {
    name           : 'DEV VERSION - ' + manifest.name + ' - DEV VERSION',
    package_path   : 'http://localhost/cryptomedic/tmp/package.zip'
  })
);
// Make the "build" instance. Since it it stored in "build", it has to
// be created after the tmp one...
create(__dirname + '/../build/', manifest);
