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

function testComponent(html) {
  // Build up the element
  let div = document.createElement("div");
  div.innerHTML = html;
  document.body.appendChild(div);
  div.firstChild.testDone = () => {
    // Register removing it afterwards
    document.body.removeChild(div);
  };

  return new Promise((resolve, reject) => {
    let i = 40;
    let interval = setInterval(() => {
      i--;
      if (i <= 0) {
        // console.log("too much tests", div.firstChild);
        clearInterval(interval);
        reject();
      }
      if (!div.firstChild) {
        // console.log("no first child");
        return ;
      }
      if (div.firstChild instanceof HTMLUnknownElement) {
        // console.log("HTMLUnknownElement");
        return;
      }
      if (!div.firstChild.shadowRoot && !div.firstChild.$$) {
        // console.log("no shadow root");
        return;
      }
      // console.log("ok, shadow root");
      clearInterval(interval);
      resolve(div.firstChild);
    }, 100);
  });
}
