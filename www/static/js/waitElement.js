/* exported waitElement */

// See polyfill for html imports: http://webcomponents.org/polyfills/html-imports/

function waitElement(element, property) {
  let test = function() {
    return typeof(element[property]) != "undefined";
  }
  if (test()) {
    return Promise.resolve(element);
  }

  return new Promise(function(resolve) {
    let cron = setInterval(function() {
      if (test()) {
        clearInterval(cron);
        resolve(element);
      }
    }, 100);
  });
}
