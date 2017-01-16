/* exported getDataService */

// See polyfill for html imports: http://webcomponents.org/polyfills/html-imports/

function waitElement(element) {
  let test = function() {
    let el = element;
    if (typeof(element) == "string") {
      el = document.getElementsById(element);
    }
    if (typeof(el) == "undefined") {
      return false;
    }
    if (typeof(el["$"]) == "undefined") {
      return false;
    }
    return el;
  }

  let el = test();
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

function getDataService(id) {
  return waitElement(id);
}
