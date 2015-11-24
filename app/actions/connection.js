
import catalog from 'actions/catalog';

export function success(data) {
  return {
    type: catalog.CONNECTION_SUCCESS,
    payload: data
  };
}

export function failure(httpStatusCode) {
  return {
    type: catalog.CONNECTION_FAILED,
    payload: httpStatusCode
  };
}
