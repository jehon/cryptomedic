
import objectify   from 'helpers/objectify';
import { myFetch } from 'helpers/myFetch';
import create      from 'helpers/create';

export function loadMock(mock, type) {
  var rootMock = '/base/tests/20_js/mocks/';
  return myFetch(rootMock + mock)
    .then(function(data) {
      if (type) {
        data = create(type, objectify(data));
      }
      return data;
    });
}


/** Apply a list of modifications
 *    def: default object
      data: { a.b.c: 1, a.b.d: 2 }
 */
export function buildRecord(def, data) {
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
