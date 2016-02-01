
import store from 'reducers/store';
import catalog from 'reducers/catalog';

export default function dispatch(type, payload) {
  if (typeof(catalog[type]) == 'undefined') {
    console.error('Dispatching "' + type + '" not defined');
  } else {
    store.dispatch({ type: type, payload: payload });
  }
}
