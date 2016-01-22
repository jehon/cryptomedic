
import catalog from "reducers/catalog";
import dispatch from "actions/dispatch";

export function downloading() {
  dispatch(catalog.DATABASE_DOWNLOADING);
}

export function downloaded() {
  dispatch(catalog.DATABASE_DOWNLOADED);
}

export function uploading(remaining) {
  dispatch(catalog.DATABASE_UPLOADING, remaining);
}

export function uploaded() {
  dispatch(catalog.DATABASE_UPLOADED);
}
