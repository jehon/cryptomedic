/* exported loadMock, testWithComponent, loadReference, testComponent */
/* global create, mock_load_test, readJSON */

let mocks = {
  'mock_load_test':  mock_load_test
};

// DEPRECATED - TODO: Used only in test_model_data
function loadMock(mock, type = false) {
  let data = Object.assign({}, mocks[mock]);
  if (type) {
    data = create(type, data);
  }
  return Promise.resolve(data);
}

function loadReference(name) {
  // Thanks to http://stackoverflow.com/a/27830579/1954789
  let valid_respond = readJSON('api/' + API_VERSION + '/tests/references/' + name);
  expect(valid_respond).not.toBeNull("The reference " + name + " is empty or not found");
  return valid_respond;
}

function testComponent(html, test = (el) => true) {
  // Set an acceptable timeout
  let oldTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  // Build up the element
  let div = document.createElement("div");
  div.style="border: red solid 1px; min-height: 10px"
  div.innerHTML = html;
  document.body.appendChild(div);
  
  // Function to close the test
  div.firstChild.testDone = () => {
    // Register removing it afterwards
    document.body.removeChild(div);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = oldTimeout;
  };

  let check = function(el) {
    if (el instanceof HTMLUnknownElement) {
      return el.tagName;
    }
    for(let i in el.children) {
      let res = check(el.children[i]);
      if (res !== true) {
        return res;
      }
    }
    return true;
  }

  return new Promise((resolve, reject) => {
    let i = 40;
    let interval = setInterval(() => {
      if (i-- <= 0) {
        // console.log("too much tests", div.firstChild);
        console.error("testComponent: component could not be instanciated ", html);
        clearInterval(interval);
        reject();
        return;
      }

      // Do we have a first child?
      if (!div.firstChild) {
        // console.log("no first child");
        return ;
      }

      // Check all object for HTMLUnknownElements
      if (!check(div.firstChild)) {
        // console.log("checking child nodes does not work");
        return;
      }

      // Add custom test
      if (!test(div.firstChild)) {
        // console.log("custom test does not works");
        return ;
      }

      // Happy case
      clearInterval(interval);
      resolve(div.firstChild);
    }, 100);
  });
}
