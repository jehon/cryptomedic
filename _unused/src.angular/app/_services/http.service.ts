import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface HttpServiceHttpError {
  message: string;
  backend: boolean;
  httpStatusCode?: number;
}

@Injectable({
  providedIn: "root"
})
export class HttpService {
  errors: HttpServiceHttpError[] = [];
  running: number = 0;

  is404(error: HttpErrorResponse): boolean {
    // Thanks to https://stackoverflow.com/questions/66824082/handling-angular-http-404-error-from-server-actually-which-represents-a-valid-re
    if (error instanceof ErrorEvent) {
      return false;
    }

    return error?.status === 404;
  }

  addError(error: HttpErrorResponse): HttpServiceHttpError {
    const httpServiceHttpError: HttpServiceHttpError = {
      message: "",
      backend: true
    };

    if (error.error instanceof ErrorEvent) {
      httpServiceHttpError.message = error.error.message;
      httpServiceHttpError.backend = false;
    } else {
      httpServiceHttpError.message = error.message;
      httpServiceHttpError.backend = true;
      httpServiceHttpError.httpStatusCode = error.status;
    }
    this.errors.push(httpServiceHttpError);

    return httpServiceHttpError;
  }
}
