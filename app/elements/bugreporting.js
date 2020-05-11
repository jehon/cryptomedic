
import html2canvas from '../../node_modules/html2canvas/dist/html2canvas.js';

import store from '../js/store.js';

import { browserUUID } from '../js/browser.js';

window.bug_reporting = (function () {
    // if (isProduction()) {
    // 	console.info('Capturing console.log/info/error and exceptions');
    // store.subscribe(() => {
    // 	const data = store.getState().user;
    // });
    // }
    // } else {
    // 	console.info('Disabling capturing console.log/info/error on localhost');
    // }

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
            <tr><td></td></tr>
        <tr><td><h3>Technical informations</h3></td></tr>
        <tr><td>URL</td><td><input name="url" size=100 readonly="readonly"></td></tr>
        <tr><td>User Agent</td><td><input name="browser_useragent" size=100 readonly="readonly"></td></tr>
        <tr><td>Computer Id</td><td><input name="computer_id" readonly="readonly" /></td></tr>
        <tr><td>Browser internal State</td><td><textarea name="browser_state" cols=100 readonly="readonly"></textarea></td></tr>
    </table>
    <input type="hidden" name="screenshot" length="65535">
    Psss: If you don't want to submit this bug report, simply refresh the page...
</form>`;

    return () => {
        const url = window.location;
        html2canvas(document.body).then(function (canvas) {
            document.getElementsByTagName('body')[0].innerHTML = txt;
            document.getElementsByName('username')[0].value = store.getState().user.username;
            document.getElementsByName('email')[0].value = store.getState().user.email;
            document.getElementsByName('url')[0].value = url;
            document.getElementsByName('browser_id')[0].value = browserUUID;
            document.getElementsByName('screenshot')[0].value = canvas.toDataURL();
            document.getElementsByName('browser_useragent')[0].value = navigator.userAgent;
            document.getElementsByName('browser_state')[0].value = JSON.stringify(store.getState());
        });
    };
})();
