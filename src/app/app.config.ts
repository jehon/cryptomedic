import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient } from "@angular/common/http";
import AuthService from "./_services/auth.service";
import routes from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: AuthService, useClass: AuthService },
    provideHttpClient()
  ]
};
