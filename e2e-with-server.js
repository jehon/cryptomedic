const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

console.log("Web Server: starting");
web = exec('php -S localhost:5555 www/api/v1.2/server.php', (err, stdout, stderr) => {
  if (err) {
    console.error("Web Server: ", err);
    return;
  }
  console.log("Web Server: ", stdout);
});
console.log("Web Server: launched");

console.log("Hooks installing");
process.on('SIGTERM', function () {
  console.log('Ctrl-C detected, bailing out gracefully');
  nw.kill();
  web.kill();
});

process.on('SIGINT', function () {
  console.log('Ctrl-C 2 detected, bailing out gracefully');
  nw.kill();
  web.kill();
});
console.log("Hooks installed");


console.log("Nightwatch: launched");
// Pass parameters:
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });
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
  console.log("Nightwatch: ended");

  console.log("Web Server: killing");
  web.kill();
  console.log("Web Server: killed");
});

