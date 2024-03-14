import { JsonPipe } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import AuthService from "./_services/auth.service";
import BackendAuthInterface from "./_services/backend.auth";
import { HttpService } from "./_services/http.service";

@Component({
  standalone: true,
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, JsonPipe],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {
  title = "Cryptomedic";

  constructor(
    public authService: AuthService,
    public httpService: HttpService
  ) {}

  get currentUser(): BackendAuthInterface | undefined {
    return this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
  }
}
