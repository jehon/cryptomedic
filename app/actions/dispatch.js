
import store from 'reducers/store';

export default function dispatch(type, payload) {
  store.dispatch({ type: type, payload: payload });
}
