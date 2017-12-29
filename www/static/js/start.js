
// Also adapt package.json for adding testing the new api
// See md5sum.php to protect old versions... and delete them when necessary !!!
let API_VERSION='v1.3';

if (!Promise || !indexedDB || !sessionStorage || !fetch) {
  window.location.href = '/static/upgrade.html';
}

window.cryptomedic = {
  serverSettings: {}
}

function are_cookies_enabled() {
  var cookieEnabled = (navigator.cookieEnabled) ? true : false;

  if (typeof(navigator.cookieEnabled) == 'undefined' && !cookieEnabled) {
    document.cookie='testcookie';
    cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
  }
  return (cookieEnabled);
}

if (!are_cookies_enabled()) {
  alert('Your cookie are disabled. Please enable them.\nVos cookies sont désactivés. Merci de les activer.');
}

if (!Promise || !indexedDB || !sessionStorage || !fetch) {
  window.location.href = '/static/upgrade.html';
}
