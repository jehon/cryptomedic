import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import AuthService from "../_services/auth.service";
import BackendAuthInterface from "../_services/backend.auth";

@Component({
  standalone: true,
  selector: "app-login",
  imports: [FormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent implements OnInit {
  form = {
    username: "",
    password: ""
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  data?: BackendAuthInterface;
  redirect: string = "/";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.redirect = this.route.snapshot.queryParamMap.get("redirectTo") ?? "/";
    this.checkRoute();
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data: BackendAuthInterface) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.data = data;
        this.checkRoute();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  checkRoute() {
    if (this.authService.currentUser) {
      this.router.navigate([this.redirect]);
    }
  }
}
