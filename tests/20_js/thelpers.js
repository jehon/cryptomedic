
import objectify          from 'helpers/objectify';
import create             from 'helpers/create';
import mock_load_test     from './mocks/mock_load_test';
import mock_patient_10    from './mocks/mock_patient_10';
import mock_sync          from './mocks/mock_sync';

let mocks = {
  'mock_load_test':  mock_load_test,
  'mock_patient_10': mock_patient_10,
  'mock_sync':       mock_sync
};

export function loadMock(mock, type = false) {
  let data = Object.assign({}, mocks[mock]);
  if (type) {
    data = create(type, objectify(data));
  }
  return Promise.resolve(data);
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
