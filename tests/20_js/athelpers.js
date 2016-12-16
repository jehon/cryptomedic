/* exported buildRecord, loadMock, testWithComponent */
/* global create, mock_load_test, mock_patient_10, mock_sync */

let mocks = {
  'mock_load_test':  mock_load_test,
  'mock_patient_10': mock_patient_10,
  'mock_sync':       mock_sync
};

function loadMock(mock, type = false) {
  let data = Object.assign({}, mocks[mock]);
  if (type) {
    data = create(type, data);
  }
  return Promise.resolve(data);
}


/** Apply a list of modifications
 *    def: default object
      data: { a.b.c: 1, a.b.d: 2 }
 */
function buildRecord(def, data) {
  def = JSON.parse(JSON.stringify(def));
  for(var a in data) {
    var ind = a.split('.');
    var d = def;
    var li = ind.pop();
    for (var i in ind) {
      if (typeof(d[ind[i]]) == 'undefined') {
        d[ind[i]] = {};
      }
      d = d[ind[i]];
    }
    d[li] = data[a];
  }
  return def;
}

function testWithComponent(name, tag, testsFn) {
  return describe(name, function() {
    let div;

    // Build up the element
    beforeEach((done) => {
      div = document.createElement("div");
      div.innerHTML = tag;
      document.body.appendChild(div);
      done();
    });

    // Register removing it afterwards
    afterEach(() => {
      document.body.removeChild(div);
    });

    // Run the tests
    it("run the test", function(done) {
      let interval = setInterval(() => {
        if (!div.firstChild || !div.firstChild.$) {
          return;
        }
        clearInterval(interval);
        testsFn(div.firstChild, done)
        done();
      }, 100);
    });
  });
}
