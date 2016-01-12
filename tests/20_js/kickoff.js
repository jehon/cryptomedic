

/** Apply a list of modifications
 *    def: default object
      data: { a.b.c: 1, a.b.d: 2 }
 */
function buildRecord(def, data) {
  def = JSON.parse(JSON.stringify(def));
  for(var a in data) {
    var ind = a.split(".");
    var d = def;
    var li = ind.pop();
    for (var i in ind) {
      if (typeof(d[ind[i]]) == "undefined") {
        d[ind[i]] = {};
      }
      d = d[ind[i]];
    }
    d[li] = data[a];
  }
  return def;
}

describe("BuildRecord", function() {
  it("should update default values with modifiers", function() {
    var ref = { a: 1, b: 2, c: { c1: 1 }, d: { d1: 2 }};
    var obj = buildRecord(ref,
      {
        a: 2,
        "d.d1": 3
      }
      );

    // Ref object is kept intact
    expect(ref.a).toBe(1);
    expect(ref.b).toBe(2);
    expect(ref.c.c1).toBe(1);
    expect(ref.d.d1).toBe(2);

    // Modifications are applied
    expect(obj.a).toBe(2);
    expect(obj.b).toBe(2);
    expect(obj.c.c1).toBe(1);
    expect(obj.d.d1).toBe(3);
  });
});

function loadMock(mock, type) {
  var rootMock = "/base/tests/20_js/mocks/";
  return myFetch(rootMock + mock)
    .then(function(data) {
      if (type) {
        data = appState().helpers.create(type, appState().helpers.objectify(data));
      }
      return data;
    });
}
