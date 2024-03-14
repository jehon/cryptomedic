import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Auto set some options
    const jsonReq = req.clone({
      withCredentials: true,
      headers: req.headers
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
    });

    return next.handle(jsonReq);
  }
}

export const httpRequestInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpRequestInterceptor,
  multi: true
};
