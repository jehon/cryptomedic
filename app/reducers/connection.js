
import catalog from 'main'

export default function(state = {
    connected: false,
    authenticated: false
  }, action) {
  switch (action.type) {
    case catalog.CONNECTION_SUCCESS:
      return {
        connected: true,
        authenticated: true
      };
    case catalog.CONNECTION_FAILED:
      return {
        // connected: Math.max(1, action.payload),
        connected: 1234,
        authenticated: state.authenticated
      }
    case catalog.CONNECTION_DISCONNECTED:
      return {
        connected: true,
        authenticated: true
      }
    default:
      return state;
  }
}
