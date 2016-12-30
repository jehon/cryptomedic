/* exported getDataService */

// See polyfill for html imports: http://webcomponents.org/polyfills/html-imports/

function waitElement(element, property) {
  let test = function() {
    let el = element;
    if (typeof(element) == "string") {
      el = document.getElementsByTagName(element);
      if (el.length == 0) {
        return false;
      }
      el = el[0];
    }
    if (typeof(el[property]) == "undefined") {
      return false;
    }
    return el;
  }

  let el  = test();
  if (el) {
    return Promise.resolve(el);
  }

  return new Promise(function(resolve) {
    let cron = setInterval(function() {
      let el  = test();
      if (el) {
        clearInterval(cron);
        resolve(el);
      }
    }, 100);
  });
}

function getDataService() {
  return waitElement("cryptomedic-data-service", "doLogin");
}
