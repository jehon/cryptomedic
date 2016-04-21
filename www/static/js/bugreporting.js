'use strict';
// http://stackoverflow.com/a/16156043/1954789

window.bug_reporting = (function () {
  var bug_reporting;
  var txt = '\
  <style> \
    input[readonly], textarea[readonly] { color:gray; background-color: white; border: none } \
  </style> \
  <h1>Bug reporting</h1> \
  <br> \
  Dear sir,<br> \
  Thank you for reporting a problem you met in the program<br> \
  <br>  \
  Can I ask you a bit more informations?<br> \
  <br> \
  <form action="/cryptomedic/maintenance/bug_submit.php" method="POST"> \
    <table>\
    <tr><td>Username</td><td><input name="username" size=100></td></tr> \
    <tr><td>Email address</td><td><input name="email" size=100></td></tr> \
    <tr><td>Description of the problem</td><td><textarea name="description" cols=100></textarea></td></tr> \
    <tr><td></td></tr> \
        <tr><td><button type="submit">Submit your bug report to Jean</button></td></tr> \
        <tr><td><a href="javascript:location.reload()">Close this page and go back to cryptomedic. Your bug report will NOT be submitted!</a></td></tr> \
        <tr><td></td></tr> \
    <tr><td><h3>Technical informations</h3></td></tr> \
    <tr><td>URL</td><td><input name="url" size=100 readonly="readonly"></td></tr> \
    <tr><td>User Agent</td><td><input name="browser_useragent" size=100 readonly="readonly"></td></tr> \
    <tr><td>Browser internal State</td><td><textarea name="browser_state" cols=100 readonly="readonly"></textarea></td></tr> \
    <tr><td>Browser console</td><td><textarea name="browser_console" cols=100 readonly="readonly"></textarea></td></tr> \
    </table> \
    <input type="hidden" name="screenshot" length="65535"> \
  </form><br><br> \
  ';

  bug_reporting = function() {
        // generate the result
    html2canvas(document.body).then(function(canvas) {
      var durl = canvas.toDataURL();
      //document.body.appendChild(canvas);
      document.getElementsByTagName('body')[0].innerHTML = txt;

      // Username
      document.getElementsByName('username')[0].value = server.settings.username;

      // User email
      document.getElementsByName('email')[0].value = '';

      // Browser custom state
      document.getElementsByName('browser_state')[0].value = JSON.stringify({ 'cryptomedic': cryptomedic, 'server': server });

      document.getElementsByName('url')[0].value = window.location;
      document.getElementsByName('browser_useragent')[0].value = navigator.userAgent;
      document.getElementsByName('browser_console')[0].value = JSON.stringify(allConsole);
      document.getElementsByName('screenshot')[0].value = durl;
    });
  };

    // @See https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
  var gOldOnError = window.onerror;
    //Override previous handler.
  window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    if (gOldOnError) {
      // Call previous handler.
      return gOldOnError(errorMsg, url, lineNumber);
    }

    // Just let default handler run.
    return false;
  };

  var allConsole = [];

    // Capture the console
  if (window.location.host != 'localhost') {
        // http://stackoverflow.com/a/9278067/1954789
    var consoleLog = window.console.log;
    window.console.log = function() {
      allConsole.push({
        level: 'log',
        timestamp: (new Date()).toISOString(),
        details: arguments });
      return consoleLog.apply(window.console, arguments);
    };

    var consoleInfo = window.console.info;
    window.console.info = function() {
      return consoleInfo.apply(window.console, arguments);
    };

    var consoleError = window.console.error;
    window.console.error = function() {
      return consoleError.apply(window.console, arguments);
    };
  } else {
    console.info('Disabling capturing console.log/info/error on localhost');
  }
  return bug_reporting;
})(window.bug_reporting);
