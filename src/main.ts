import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
// For class-transformer
import "reflect-metadata";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
