import Pojo from "../business/abstracts/pojo";
import Folder from "../business/folder";
import { ServerRequestError, TransportRequestError } from "../utils/exceptions";
import nullify from "../utils/nullify";

function request({
  url,
  method,
  data,
  allowed
}: {
  url: string[];
  method?: string;
  data?: any;
  allowed?: number[];
}) {
  url = url || ["/"];
  method = method || "GET";
  data = nullify(data);

  if (url[0] !== "/") {
    url = ["/", "api", ...url];
  }

  const controller = new AbortController();
  const signal = controller.signal;

  const strUrl =
    url.join("/").replaceAll("//", "/") +
    (method === "GET" ? "?" + new URLSearchParams(data).toString() : "");

  return fetch(strUrl, {
    method,
    credentials: "same-origin",
    signal,
    headers: {
      "Content-Type": "application/json"
    },
    body: method === "GET" ? null : JSON.stringify(data)
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
    url: ["fiche", file.getServerRessource(), "unlock", file.id]
    // TODO: method: "PUT"
  })
    .then((json) => json.file)
    .then((json) => file.createNewInstance(json));
}

export function folderFileDelete<T extends Pojo>(file: T): Promise<Folder> {
  // See www/api/app/Http/Controllers/FicheController.php
  return request({
    url: ["fiche", file.getServerRessource(), file.id],
    method: "DELETE"
  })
    .then((json) => json.folder)
    .then((json) => new Folder(json));
}

// See legacy/app-old/v1/elements/cryptomedic-data-service.js
