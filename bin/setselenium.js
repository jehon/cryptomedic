
var fs  = require("fs");
var seleniumServer = require("selenium-server");

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function() {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

var seleniumPath = seleniumServer.path;

copyFile(seleniumPath, __dirname + "/../node_modules/selenium-server/lib/runner/selenium-server-persolatest.jar", function(error) {
  if (error) {
    console.error("Error in copying file", error);
  } else {
    console.log("Selenium file installed: " + seleniumPath);
  }
});
