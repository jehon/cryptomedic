const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

console.log("Web Server: starting");
let web = exec('php -S localhost:5556 webserver.php', (err, stdout, stderr) => {
  if (err) {
    console.error("Web Server: terminated abnormaly");
  }
});
web.stdout.pipe(process.stdout);
web.stderr.pipe(process.stderr);
console.log("Web Server: launched");

console.log("Hooks installing");
function cleanExit(code = 1) {
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
  process.exit(code);
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


let subargs = process.argv;
while(subargs.length > 0 && subargs[0].indexOf('nodejs') > 0) {
  subargs.shift();
  subargs.shift();
}
let sargs = "";
if (subargs.length > 0) {
  sargs = "'" + subargs.join("' '") + "'";
}
console.log("Nightwatch: arguments = ", sargs);

console.log("Nightwatch: launch");
nw = exec('node ./node_modules/.bin/nightwatch ' + sargs);
nw.stdout.pipe(process.stdout);
nw.stderr.pipe(process.stderr);

nw.on('exit', (code) => {
  console.log("Nightwatch: exited");
  cleanExit(code);
});

