/* exported getDataService */

// See polyfill for html imports: http://webcomponents.org/polyfills/html-imports/

function getDataService(cssSelector = '#dataService') {
  let test = function() {
    let el = cssSelector;
    if (typeof(cssSelector) == "string") {
      el = document.querySelector(cssSelector);
    }
    if (!el) {
      return false;
    }
    if (!("$" in el) && !("request" in el)) {
      return false;
    }
    return el;
  }

  let el = test();
  if (el) {
    return Promise.resolve(el);
  }

  return new Promise(function(resolve, reject) {
    let i = 40;
    let cron = setInterval(function() {
      let el  = test();
      i--;
      if (i < 0) {
        console.error("Could not find cssSelector ", cssSelector);
        reject("Could not find cssSelector ", cssSelector);
        clearInterval(cron);
      }
      if (el) {
        clearInterval(cron);
        resolve(el);
      }
    }, 250);
  });
}
