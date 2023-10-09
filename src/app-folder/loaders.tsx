import nullify from "../utils/nullify";
import {
  ServerRequestError,
  TransportRequestError
} from "../../legacy/app-old/v2/widgets/func/x-requestor";
import Folder from "../business/folder";

async function request({
  url,
  method,
  data,
  allowed
}: {
  url: string;
  method?: string;
  data?: any;
  allowed?: number[];
}) {
  url = url || "/";
  method = method || "GET";
  data = nullify(data);

  if (url[0] != "/") {
    url = `/api/${url}`;
  }

  const controller = new AbortController();
  const signal = controller.signal;

  return fetch(
    url + (method == "GET" ? "?" + new URLSearchParams(data).toString() : ""),
    {
      method,
      credentials: "same-origin",
      signal,
      headers: {
        "Content-Type": "application/json"
      },
      body: method == "GET" ? null : JSON.stringify(data)
    }
  ).then(
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

export async function getFolder(id: number): Promise<Folder> {
  return request({ url: `folder/Patient/${id}` })
    .then((data) => data.folder)
    .then((folder) => new Folder(folder));
}
