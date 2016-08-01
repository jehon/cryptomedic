
// **** Detect the remote port ****
var remoteTarget;
var port = 80;
try {
  var vport = require('child_process').execSync('vagrant port --guest 80', { cwd: __dirname }).toString();

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
