// https://github.com/GoogleChrome/sw-precache#options

/* global require,process */

let path = require('path');
let website_dependency_tree = require('website-dependency-tree');
let swprecache = require("sw-precache");

if (process.argc < 3) {
  console.log("Need a file name");
  process.exit(255);
}

let index = process.argv[2];

console.log("Treating file " + index + " in " + process.cwd());

// Test website_dependency_tree

website_dependency_tree
  .retrieve(index)
  .then(function(code){
    var dependencies = [];
    // console.log(code);
    for(var i in code.dependees_all) {
      let c = code.dependees_all[i];
      if (c.last_dependency.uri) {
        // We need an uri, otherwise it is an abstract stuff
        // console.info(i, ": ", c.name);
        if (c.location.disk.path) {
          // console.info(c.location.disk.path);
          var r = path.relative(process.cwd(), c.location.disk.path);
          // console.log(i, ": ", r);
          dependencies.push(r);

        } else {
          console.info("path not resolved physically: ", c.location.disk.path);
        }
      }
    }
    return dependencies;
  })
  .then(dependencies => {
    // console.log(dependencies);
    swprecache.write("service-worker.js", {
      verbose: true,                 // Show info on build
      cacheId: 'sw-precache',        // Usefull to match old cache (stay coherent)
      staticFileGlobs: []
        .concat(dependencies)   // List of files to be cached (could be glob, but this is good)
        // .concat([
        //   'static/**/*.css',
        //   'static/**/*.html',
        //   'static/**/*.html',
        //   'static/**/*.js'
        // ])
        .filter(v => (v != "static/service-worker.js"))
    })
  })

// module.exports = {
//   staticFileGlobs: [
//     'www/static/**/*.css',
//     'www/static/**/*.html',
//     'www/static/**/*.html',
//     'www/static/**/*.js'
//   ],
//   stripPrefix: 'www/',
//   verbose: true
// }
