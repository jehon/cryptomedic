
function startServer(port = 5555) {
    const exec = require('child_process').exec;
    const execSync = require('child_process').execSync;

    console.log(`Web Server: starting on ${port}`);
    
    require('kill-by-port').killByPort(port);

    web = exec(`php -S localhost:${port} webserver.php`, (err, stdout, stderr) => {
        if (err) {
            console.error("Web Server: terminated abnormaly");
        }
    });
    web.stdout.pipe(process.stdout);
    web.stderr.pipe(process.stderr);
    console.log("Web Server: launched");

    return (code = 1) => {
        if (web) {
            console.log("Web Server: killing");
            web.kill();
            console.log("Web Server: killed");
            web = false;
        }
        process.exit(code);
    }
}

module.exports = startServer;

if (require.main === module) {
    const cleanExit = startServer();

    console.log("Hooks installing");
    process.on('SIGTERM', function () {
        console.log('SIGTERM detected, bailing out gracefully');
        cleanExit();
    });

    process.on('SIGINT', function () {
        console.log('SIGINT detected, bailing out gracefully');
        cleanExit();
    });
    console.log("Hooks installed");
}
