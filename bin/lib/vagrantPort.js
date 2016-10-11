
// **** Detect the remote port ****
var path = require('path');

var remoteTarget;
if (typeof(port) == "undefined") {
  port = 80;
}
{
  var iport = port;
  var url = "";
  var hostname = path.basename(path.dirname(path.dirname(__dirname))) + ".local";
  try {
    var vport = require('child_process').execSync('vagrant port --guest ' + port, { cwd: __dirname }).toString();

    if (!isNaN(vport)) {
      port = vport.trim();
      url = 'http://localhost:' + port + '/'
      console.info("Detected vagrant port: -" + port + "-");
    } else {
      url = 'http://' + hostname + ":" + iport + "/";
      console.info("Vagrant didn't send a valid port: ", vport);
    }
  } catch (e) {
    console.info("Error running vagrant, but continuing ");
    url = 'http://' + hostname + ":" + iport + "/";
    // console.error(e);
  }

  // module.exports.port = port;
  module.exports = url; //'http://localhost:' + port + '/';

  console.log("Mapping found: ", iport, " => ", port);
  console.log("Remote host: ", url);
}
