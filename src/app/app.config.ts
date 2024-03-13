import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient
} from "@angular/common/http";
import AuthService from "./_services/auth.service";
import { HttpRequestInterceptor } from "./_services/http-request-interceptor";
import routes from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: AuthService,
      useClass: AuthService,
      deps: [HttpClient]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.hydrate(),
      deps: [AuthService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ]
};
