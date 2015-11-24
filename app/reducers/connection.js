
import catalog from 'actions/catalog'

export default function(state = 0, action) {
  switch (action.type) {
    case catalog.CONNECTION_SUCCESS:
      return 0;
    case catalog.CONNECTION_FAILED:
      return Math.max(1, action.payload.httpStatusCode);
    default:
      return state;
  }
}
