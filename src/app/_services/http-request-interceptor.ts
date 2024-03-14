import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpRequestInterceptor<T extends undefined | unknown>
  implements HttpInterceptor
{
  intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    // Auto set some options
    req = req.clone({
      withCredentials: true,
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });

    return next.handle(req);
  }
}
