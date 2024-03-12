import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-root",
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {
  title = "cryptomedic";
  isLoggedIn = false;
  username?: string;
  // eventBusSub?: Subscription;

  // constructor(
  //   private authService: AuthService,
  //   private eventBusService: EventBusService
  // ) {}

  // ngOnInit(): void {
  //   if (this.isLoggedIn) {
  //   }

  //   this.eventBusSub = this.eventBusService.on("logout", () => {
  //     this.logout();
  //   });
  // }

  logout(): void {
    //   this.authService.logout().subscribe({
    //     next: (res) => {
    //       window.location.reload();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     }
    //   });
  }
}
