// https://github.com/GoogleChrome/sw-precache#options

var path = require('path');
var website_dependency_tree = require('website-dependency-tree');

let index = "static/index.html";

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
    console.log(dependencies);
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
