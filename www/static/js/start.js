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

Promise.prototype.myFinallyDone = function (callback) {
  callback = callback || function(data) { return data; };
  return this
    .then(callback, callback)
    .catch(function(reason) { console.error(reason); });
};

/* Service worker */
if (location.protocol == 'https:') {
  if (location.pathname.split('/')[1] != 'online') {
    console.info('[SW] Detection: offline mode, activating plugin');
    activateCache();
  } else {
    console.info('[SW] Detection: online mode');
  }
} else {
  console.info('[SW] Detection: https not detcted, online mode');
}
