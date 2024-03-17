import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi
} from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";
import { httpRequestInterceptorProvider } from "./_helpers/http-request-interceptor";
import AuthService from "./_services/auth.service";
import routes from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    // Thanks to https://github.com/angular/angular-cli/issues/25187#issuecomment-1629727033
    provideHttpClient(withInterceptorsFromDi()),
    httpRequestInterceptorProvider,
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideToastr(),
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
    }
  ]
};
