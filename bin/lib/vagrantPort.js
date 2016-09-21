
// **** Detect the remote port ****
var remoteTarget;
if (typeof(port) == "undefined") {
  port = 80;
}
{
  var iport = port;
  try {
    var vport = require('child_process').execSync('vagrant port --guest ' + port, { cwd: __dirname }).toString();

    if (!isNaN(vport)) {
      port = vport.trim();
      console.info("Detected vagrant port: -" + port + "-");
    } else {
      console.warn("Vagrant didn't send a valid port: ", vport);
    }
  } catch (e) {
    console.warn("Error running vagrant, but continuing ");
    // console.error(e);
  }

  // module.exports.port = port;
  module.exports  = 'http://localhost:' + port + '/';

  console.log("Mapping found: ", iport, " => ", port);
}
