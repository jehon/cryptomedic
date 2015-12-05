
import * as appState from 'main';

console.log(appState);
// console.log(appState.actions);
// console.log(transitions());

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false
    };
  }
  switch (action.type) {
    // case transitions.CONNECTION_SUCCESS:
    //   return {
    //     connected: true,
    //     authenticated: true
    //   };
    // case transitions.CONNECTION_EXPIRED:
    //   return {
    //     connected: true,
    //     authenticated: false
    //   };
    // case transitions.CONNECTION_FAILED:
    //   return {
    //     connected: Math.max(1, action.payload),
    //     authenticated: state.authenticated
    //   };
    default:
      return state;
  }
}
