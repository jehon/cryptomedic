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
  let valid_respond = readJSON('api/v1.2/tests/references/' + name);
  expect(valid_respond).not.toBeNull("The reference " + name + " is empty or not found");
  return valid_respond;
}

function testComponent(html, test = () => true) {
  // Build up the element
  let div = document.createElement("div");
  div.style="border: red solid 1px; min-height: 10px"
  div.innerHTML = html;
  document.body.appendChild(div);
  div.firstChild.testDone = () => {
    // Register removing it afterwards
    document.body.removeChild(div);
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
      if (!div.firstChild) {
        // console.log("no first child");
        return ;
      }

      // Check all object for HTMLUnknownElements
      let ok = check(div.firstChild);

      // Add custom test
      ok = ok && test(div.firstChild);

      if (ok === true) {
        // console.log("ok, let's continue");
        clearInterval(interval);
        resolve(div.firstChild);
      }
      i--;
      if (i <= 0) {
        // console.log("too much tests", div.firstChild);
        console.log("testComponent: HTMLUnknownElement: ", ok);
        clearInterval(interval);
        reject();
      }
    }, 100);
  });
}
