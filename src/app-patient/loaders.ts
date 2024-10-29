import Pojo from "../business/abstracts/pojo";
import Folder from "../business/folder";
import { CRUD } from "../constants";
import { ServerRequestError, TransportRequestError } from "../utils/exceptions";

function request({
  url,
  method,
  queryData,
  formData,
  allowed
}: {
  url: string[];
  method?: string;
  queryData?: Record<string, any>;
  formData?: FormData;
  allowed?: number[];
}) {
  url = url || ["/"];
  method = method || CRUD.read;

  if (url[0] !== "/") {
    url = ["/", "api", ...url];
  }

  const controller = new AbortController();
  const signal = controller.signal;

  const strUrl =
    url.join("/").replaceAll("//", "/") +
    (method === "GET" ? "?" + new URLSearchParams(queryData).toString() : "");

  return fetch(strUrl, {
    method,
    credentials: "same-origin",
    signal,
    headers: {
      "Content-Type": "application/json"
      // "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
      method === "GET"
        ? null
        : formData
          ? JSON.stringify(Object.fromEntries(formData))
          : undefined
  }).then(
    (response) => {
      if (
        (response.status >= 200 && response.status < 300) ||
        (allowed && allowed.indexOf(response.status) >= 0)
      ) {
        return response.json();
      }
      throw new ServerRequestError(`Error code is ${response.status}`);
    },
    (error) => {
      let err = new Error();

      // https://github.com/axios/axios#handling-errors

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        err = new ServerRequestError(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        err = new TransportRequestError(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        err = error;
      }
      throw err;
    }
  );
}

export function getFolder(id: string): Promise<Folder> {
  return request({ url: ["folder", "Patient", id] })
    .then((json) => json.folder)
    .then((json) => new Folder(json));
}

export function folderFileUnlock<T extends Pojo>(file: T): Promise<T> {
  // See www/api/app/Http/Controllers/FicheController.php
  return request({
    url: [
      "fiche",
      file.getStatic().getTechnicalName(),
      "unlock",
      file.id || ""
    ],
    method: CRUD.update
  })
    .then((json) => json.file)
    .then((json) => file.getStatic().factory(json) as T);
}

export function folderFileDelete<T extends Pojo>(
  file: T
): Promise<Folder | undefined> {
  // See www/api/app/Http/Controllers/FicheController.php
  return (
    request({
      url: ["fiche", file.getStatic().getTechnicalName(), file.id || ""],
      method: CRUD.delete
    })
      .then((json) => json.folder)
      // TODO: Should have a better return from server when nothing remain!
      .then((json) => (json && json.length > 0 ? new Folder(json) : undefined))
  );
}

export function folderFileCreate(
  file: Pojo,
  formData: FormData
): Promise<{ folder: Folder; newKey: string }> {
  return request({
    url: ["fiche", file.getStatic().getTechnicalName()],
    method: CRUD.create,
    formData
  }).then((json) => ({
    newKey: "" + json.newKey,
    folder: new Folder(json.folder)
  }));
}

export function folderFileUpdate(
  file: Pojo,
  formData: FormData
): Promise<Folder> {
  return request({
    url: ["fiche", file.getStatic().getTechnicalName(), file.getId() || ""],
    method: CRUD.update,
    formData
  })
    .then((json) => json.folder)
    .then((json) => new Folder(json));
}

// See legacy/app-old/v1/elements/cryptomedic-data-service.js
