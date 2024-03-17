import { JsonPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { filter } from "rxjs";
import AuthService from "./_services/auth.service";
import { HttpService } from "./_services/http.service";

@Component({
  standalone: true,
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, JsonPipe],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
  title = "Cryptomedic";

  constructor(
    public httpService: HttpService,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.checkRoute();
      this.toastr.success("Logged out");
    });
  }

  checkRoute() {
    if (this.authService.isAuthenticated()) {
      return;
    }

    const currentRoute = this.router.url;
    if (currentRoute.startsWith("/login")) {
      return;
    }

    this.router.navigate(["/login"], {
      queryParams: { redirectTo: currentRoute }
    });
  }
}
