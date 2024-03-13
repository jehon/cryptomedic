import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import AuthService from "./_services/auth.service";
import BackendAuthInterface from "./_services/backend.auth";

@Component({
  standalone: true,
  selector: "app-root",
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
  title = "cryptomedic";
  currentUser?: BackendAuthInterface;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.authService.events.subscribe((val) => {
      console.log("update", { val });
      this.currentUser = val;
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      //     next: (res) => {
      //       window.location.reload();
      //     },
      //     error: (err) => {
      //       console.log(err);
      //     }
    });
  }
}
