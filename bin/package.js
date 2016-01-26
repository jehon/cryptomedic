
// https://developer.mozilla.org/en-US/Marketplace/Options/Self_publishing#Self-publishing_packaged_apps;

// https://www.npmjs.com/package/node-zip
// https://www.npmjs.com/package/jszip

var fs = require('fs');
var fse = require('fs-extra');
var archiver = require('archiver');
require('es6-object-assign').polyfill();

var version = (new Date()).getTime();

function create(path, flavor, manifest) {
  /**
   * Function to create a package based on 'build' directory and a given @param manifest
   * into @param path
   */
  var archive = archiver.create('zip', {});

  archive.on('error', function(err){
    throw err;
  });

  archive.directory(__dirname + '/../build/', '/build/');
  archive.pipe(fs.createWriteStream(path +  'package' + flavor + '.zip'));

  archive.file(__dirname + '/../index.html', { name: '/index.html' });
  archive.append(JSON.stringify(manifest), { name: 'manifest.webapp' });
  archive.finalize();

  var minimanifest = {
    name          : manifest.name,
    package_path  : manifest.package_path,
    developer     : manifest.developer,
    version       : manifest.version,
    icons         : manifest.icons
  };
  fs.writeFileSync(path + 'manifest' + flavor + '.webapp', JSON.stringify(minimanifest));
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
  package_path   : 'http://www.cryptomedic.org/cryptomedic/package.zip',
  developer      : {
    name         : 'Jean Honlet',
    url          : 'https://github.com/jehon/'
  },
  default_locale : 'en',
  chrome         : {
    navigation   : true
  },
  version        : version
};


fse.removeSync(__dirname + '/../build/package.zip');
fse.removeSync(__dirname + '/../build/manifest.webapp');
fse.removeSync(__dirname + '/../tmp/package.zip');
fse.removeSync(__dirname + '/../tmp/manifest.webapp');
fse.removeSync(__dirname + '/../package.zip');
fse.removeSync(__dirname + '/../manifest.webapp');
fse.removeSync(__dirname + '/../package-dev.zip');
fse.removeSync(__dirname + '/../manifest-dev.webapp');

// Make the two instances
create(__dirname + '/../', '-dev', Object.assign({},
  manifest,
  {
    name           : manifest.name + ' - DEV',
    package_path   : 'http://localhost/cryptomedic/package-dev.zip',
  })
);
// Make the "build" instance. Since it it stored in "build", it has to
// be created after the tmp one...
create(__dirname + '/../', '', manifest);
