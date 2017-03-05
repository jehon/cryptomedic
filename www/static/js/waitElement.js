/* exported getDataService */

// See polyfill for html imports: http://webcomponents.org/polyfills/html-imports/

function waitElement(element) {
  let test = function() {
    let el = element;
    if (typeof(element) == "string") {
      el = document.getElementById(element);
    }
    if (!el) {
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

  return new Promise(function(resolve, reject) {
    let i = 40;
    let cron = setInterval(function() {
      let el  = test();
      i--;
      if (i < 0) {
        console.error("Could not find element ", element);
        reject("Could not find element ", element);
        clearInterval(cron);
      }
      if (el) {
        clearInterval(cron);
        resolve(el);
      }
    }, 250);
  });
}

function getDataService(id = 'dataService') {
  return waitElement(id);
}
