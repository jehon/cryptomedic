import { ServerRequestError, TransportRequestError } from "./exceptions";

export type CRUDType = "POST" | "GET" | "PUT" | "DELETE";
export const CRUD = {
  search: "GET" as CRUDType,
  create: "POST" as CRUDType,
  submit: "POST" as CRUDType,
  read: "GET" as CRUDType,
  update: "PUT" as CRUDType,
  delete: "DELETE" as CRUDType
};

export function request({
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

  //
  // Method spoofing:
  //   PHP does not parse form data
  //   for PUT request, so we fake it
  //
  // https://laravel.com/docs/11.x/routing#form-method-spoofing
  // https://stackoverflow.com/a/50691997/1954789
  //
  if (method.toUpperCase() != "POST" && formData) {
    // formData = new URLSearchParams(formData);
    formData.append("_method", method);
    method = "post";
  }

  return fetch(strUrl, {
    method,
    credentials: "same-origin",
    signal,
    body: formData
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
