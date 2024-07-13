import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { HttpService } from "../_services/http.service";

@Injectable()
export class HttpRequestInterceptor<T> implements HttpInterceptor {
  constructor(private httpService: HttpService) {}

  intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    this.httpService.running++;

    // Auto set some options
    const jsonReq = req.clone({
      withCredentials: true,
      headers: req.headers
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
    });

    return (
      next
        .handle(jsonReq)
        // .pipe(
        //   catchError((error: HttpErrorResponse) => {
        //     let message: string;

        //     if (error.error instanceof ErrorEvent) {
        //       message = `Client error: ${error.error.message}`;
        //     } else {
        //       message = `Server code: ${error.status}\nMessage: ${error.message}`;
        //       if (404 === error.status) {
        //         // Thanks to https://stackoverflow.com/questions/66824082/handling-angular-http-404-error-from-server-actually-which-represents-a-valid-re
        //         const response = new HttpResponse<T>({
        //           body: undefined //your body object
        //         });
        //         return of<HttpResponse<T>>(response);
        //       }
        //     }

        //     return throwError(() => message);
        //   })
        // );
        .pipe(finalize(() => this.httpService.running--))
    );
  }
}

export const httpRequestInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpRequestInterceptor,
  multi: true
};
