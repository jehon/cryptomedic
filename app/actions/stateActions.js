
import catalog from "reducers/catalog";
import dispatch from "actions/dispatch";

export function busy(msg) {
  dispatch(catalog.STATE_BUSY, msg);
}

export function ready() {
  dispatch(catalog.STATE_READY);
}

export function clear() {
  dispatch(catalog.STATE_CLEAR);
}
