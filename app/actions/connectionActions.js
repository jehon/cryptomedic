
import catalog from "reducers/catalog";
import dispatch from "actions/dispatch";

export function success() {
  dispatch(catalog.CONNECTION_SUCCESS);
}

export function settings(data) {
  dispatch(catalog.CONNECTION_SETTINGS, data);
  return data;
}

export function failed(httpErrorCode) {
  dispatch(catalog.CONNECTION_FAILED, httpErrorCode);
}

export function expired() {
  dispatch(catalog.CONNECTION_EXPIRED);
}

export function serverError() {
  dispatch(catalog.CONNECTION_SERVER_ERROR);
}
