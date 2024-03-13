import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { HttpClient, provideHttpClient } from "@angular/common/http";
import AuthService from "./_services/auth.service";
import routes from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: AuthService,
      useClass: AuthService,
      deps: [HttpClient]
    }
  ]
};
