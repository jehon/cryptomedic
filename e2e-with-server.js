const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

console.log("Web Server: starting");
let web = exec('php -S localhost:5556 www/api/v1.2/server.php', (err, stdout, stderr) => {
  if (err) {
    console.error("Web Server: ", err);
    return;
  }
  console.log("Web Server: ", stdout);
});
console.log("Web Server: launched");

console.log("Hooks installing");
function cleanExit() {
  if (web) {
    console.log("Web Server: killing");
    web.kill();
    console.log("Web Server: killed");
    web = false;
  }
  if (nw) {
    console.log("Nightwatch: killing");
    nw.kill();
    console.log("Nightwatch: killed");
    nw = false;
  }
}

process.on('SIGTERM', function () {
  console.log('SIGTERM detected, bailing out gracefully');
  cleanExit();
});

process.on('SIGINT', function () {
  console.log('SIGINT detected, bailing out gracefully');
  cleanExit();
});
console.log("Hooks installed");


console.log("Nightwatch: launched");
// Pass parameters:
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });
console.log("Nightwatch: arguments = ", sargs);


console.log("Nightwatch: launch");
nw = exec('node ./node_modules/.bin/nightwatch');
// nw.stdout.pipe(process.stdout);
// nw.stderr.pipe(process.stderr);
nw.stdout.on('data', function(data) {
  process.stdout.write(data.toString());
});
nw.stderr.on('data', function(data) {
  process.stderr.write(data.toString());
});

nw.on('exit', () => {
  console.log("Nightwatch: exited");
  cleanExit();
});

