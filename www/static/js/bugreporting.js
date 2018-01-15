'use strict';
// http://stackoverflow.com/a/16156043/1954789

/*
  Raven:
    https://docs.sentry.io/clients/javascript/config/
    https://docs.sentry.io/clients/javascript/
*/

if (!("computerUUID" in localStorage)) {
    localStorage.computerUUID = window.uuid();
    console.log("Generated computer UUID: ", localStorage.computerUUID);
}

window.bug_reporting = (function() {
    if (window.location.host.substr(0, 'localhost'.length) != 'localhost') {
        console.log("Capturing console.log/info/error and exceptions");
        if (typeof(Raven) != "undefined") {
            Raven.config('https://7dece2b0b38e413baca8b81e17929eb2@sentry.io/270948', {
                release: window.application_version
            }).install();

            const waitForUserCB = () => {
                if (typeof userCB !== "undefined") {
                    const data = userCB.add(data => {
                        if (data) {
                            Raven.setUserContext({
                                username:   data.username,
                                group:      data.group,
                                name:       data.name,
                                computerID: localStorage.computerUUID
                            });
                        } else {
                            Raven.setUserContext({
                                computerID: localStorage.computerUUID                                
                            });
                        }
                    });
                } else {
                    setTimeout(waitForUserCB, 250);
                }
            }
        }
    } else {
        console.info('Disabling capturing console.log/info/error on localhost');
    }

    const txt = `
<style>
    input[readonly], textarea[readonly] { color:gray; background-color: white; border: none }
    table, tr, td { vertical-align: top; }
</style>
<h1>Bug reporting</h1>
<br>
Dear sir,<br>
Thank you for reporting a problem you met in the program<br>
<br>
Can I ask you a bit more informations?<br>
<br>
<form action="/maintenance/bug_submit.php" method="POST">
    <table>
        <tr><td>Username</td><td><input name="username" size=100></td></tr>
        <tr><td>Email address</td><td><input name="email" size=100></td></tr>
        <tr><td>Description of the problem</td><td><textarea name="description" cols=100></textarea></td></tr>
        <tr><td></td></tr>
            <tr><td><button type="submit">Submit your bug report to Jean</button></td></tr>
            <tr><td><a href="javascript:location.reload()">Close this page and go back to cryptomedic. Your bug report will NOT be submitted!</a></td></tr>
            <tr><td></td></tr>
        <tr><td><h3>Technical informations</h3></td></tr>
        <tr><td>URL</td><td><input name="url" size=100 readonly="readonly"></td></tr>
        <tr><td>User Agent</td><td><input name="browser_useragent" size=100 readonly="readonly"></td></tr>
        <tr><td>Computer Id</td><td><input name="computer_id" readonly="readonly" /></td></tr>
        <tr><td>Browser internal State</td><td><textarea name="browser_state" cols=100 readonly="readonly"></textarea></td></tr>
    </table>
    <input type="hidden" name="screenshot" length="65535">
</form>`;

    return () => {
        const url = window.location;
        Raven.captureMessage('User Feedback sent for ' + url, {
            logger: "data-service",
            level: 'warn', // one of 'info', 'warning', or 'error'
            extra: {}
        });

        html2canvas(document.body).then(function(canvas) {
            document.getElementsByTagName('body')[0].innerHTML = txt;
            document.getElementsByName('username')[0].value          = window.cryptomedic.serverSettings.username;
            document.getElementsByName('email')[0].value             = window.cryptomedic.serverSettings.email;
            document.getElementsByName('url')[0].value               = url;
            document.getElementsByName('computer_id')[0].value       = localStorage.computerUUID;
            document.getElementsByName('screenshot')[0].value        = canvas.toDataURL();
            document.getElementsByName('browser_useragent')[0].value = navigator.userAgent;
            document.getElementsByName('browser_state')[0].value     = JSON.stringify(store.getState());
        });
    };
})();
