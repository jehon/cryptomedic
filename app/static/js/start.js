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
  window.location.href = 'static/upgrade.html';
}

var service_backend = service_backend_fn();
